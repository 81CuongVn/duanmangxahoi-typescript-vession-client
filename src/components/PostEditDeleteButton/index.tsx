import React from 'react'
import { Box, IconButton } from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'
import DeleteIconButton from './DeleteIconButton'

interface PostEditDeleteButtonProps {}

const PostEditDeleteButton: React.FC<PostEditDeleteButtonProps> = (
  props: PostEditDeleteButtonProps
) => {
  return (
    <Box>
      <IconButton icon={<EditIcon />} aria-label='edit' mr={4} />
      <DeleteIconButton></DeleteIconButton>
    </Box>
  )
}

export default PostEditDeleteButton
