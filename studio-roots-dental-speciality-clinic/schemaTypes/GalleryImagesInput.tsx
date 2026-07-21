import {useCallback, useEffect, useState} from 'react'
import {
  Box,
  Button,
  Card,
  Dialog,
  Flex,
  Grid,
  Spinner,
  Stack,
  Text,
  TextInput,
} from '@sanity/ui'
import {ArrayOfObjectsInputProps, insert, setIfMissing, useClient} from 'sanity'

type ImageAsset = {
  _id: string
  url?: string
  originalFilename?: string
}

const PAGE_SIZE = 48

/**
 * Default gallery array input + multi-select from already-uploaded Sanity assets.
 * Shows under Gallery images so editors can add many photos at once.
 */
export function GalleryImagesInput(props: ArrayOfObjectsInputProps) {
  const {onChange, renderDefault} = props
  const client = useClient({apiVersion: '2024-01-29'})

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [assets, setAssets] = useState<ImageAsset[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [search, setSearch] = useState('')
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  const selectedCount = selectedIds.size

  const loadAssets = useCallback(async () => {
    setLoading(true)
    try {
      const filter = search.trim()
        ? `*[_type == "sanity.imageAsset" && originalFilename match $match]`
        : `*[_type == "sanity.imageAsset"]`
      const params = search.trim() ? {match: `*${search.trim()}*`} : {}

      const total = await client.fetch<number>(`count(${filter})`, params)
      setTotalPages(Math.max(1, Math.ceil(total / PAGE_SIZE)))

      const start = (page - 1) * PAGE_SIZE
      const end = start + PAGE_SIZE
      const rows = await client.fetch<ImageAsset[]>(
        `${filter} | order(_createdAt desc) [$start...$end] {
          _id,
          url,
          originalFilename
        }`,
        {...params, start, end},
      )
      setAssets(rows || [])
    } finally {
      setLoading(false)
    }
  }, [client, page, search])

  useEffect(() => {
    if (!open) return
    void loadAssets()
  }, [open, loadAssets])

  const toggleAsset = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const closeDialog = () => {
    setOpen(false)
    setSearch('')
    setPage(1)
    setSelectedIds(new Set())
  }

  const addSelected = () => {
    const patches = [...selectedIds].map((id) =>
      insert(
        [
          {
            _key: `${id.slice(-8)}-${Math.random().toString(36).slice(2, 9)}`,
            _type: 'image',
            asset: {_type: 'reference', _ref: id},
          },
        ],
        'after',
        [-1],
      ),
    )

    onChange([setIfMissing([]), ...patches])
    closeDialog()
  }

  return (
    <Stack space={3}>
      {renderDefault(props)}
      <Button
        mode="ghost"
        text="Select uploaded images"
        tone="primary"
        onClick={() => setOpen(true)}
      />

      {open ? (
        <Dialog
          header="Select uploaded images"
          id="gallery-images-picker"
          onClose={closeDialog}
          width={4}
          zOffset={1000}
          footer={
            <Flex justify="flex-end" gap={2} padding={3}>
              <Button mode="ghost" text="Cancel" onClick={closeDialog} />
              <Button
                tone="primary"
                text={selectedCount ? `Add ${selectedCount} selected` : 'Add selected'}
                disabled={selectedCount === 0}
                onClick={addSelected}
              />
            </Flex>
          }
        >
          <Stack space={4} padding={4}>
            <form
              onSubmit={(event) => {
                event.preventDefault()
                setPage(1)
                void loadAssets()
              }}
            >
              <Flex gap={2}>
                <Box flex={1}>
                  <TextInput
                    value={search}
                    placeholder="Search by filename"
                    onChange={(event) => setSearch(event.currentTarget.value)}
                  />
                </Box>
                <Button type="submit" text="Search" mode="ghost" />
              </Flex>
            </form>

            {loading ? (
              <Flex align="center" justify="center" padding={5}>
                <Spinner muted />
              </Flex>
            ) : assets.length === 0 ? (
              <Text muted>No images found. Upload some in Media first.</Text>
            ) : (
              <Grid columns={[2, 3, 4]} gap={3}>
                {assets.map((asset) => {
                  const selected = selectedIds.has(asset._id)
                  return (
                    <Card
                      key={asset._id}
                      padding={2}
                      radius={2}
                      shadow={1}
                      tone={selected ? 'primary' : 'default'}
                      style={{cursor: 'pointer'}}
                      onClick={() => toggleAsset(asset._id)}
                    >
                      <Stack space={2}>
                        <Box style={{aspectRatio: '1', overflow: 'hidden', borderRadius: 4}}>
                          {asset.url ? (
                            <img
                              src={`${asset.url}?w=240&h=240&fit=crop`}
                              alt={asset.originalFilename || 'Asset'}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                display: 'block',
                              }}
                            />
                          ) : null}
                        </Box>
                        <Text size={0} muted style={{wordBreak: 'break-all'}}>
                          {asset.originalFilename || asset._id}
                        </Text>
                      </Stack>
                    </Card>
                  )
                })}
              </Grid>
            )}

            {totalPages > 1 ? (
              <Flex align="center" justify="space-between">
                <Button
                  mode="ghost"
                  text="Previous"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                />
                <Text size={1}>
                  Page {page} / {totalPages}
                </Text>
                <Button
                  mode="ghost"
                  text="Next"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                />
              </Flex>
            ) : null}
          </Stack>
        </Dialog>
      ) : null}
    </Stack>
  )
}
