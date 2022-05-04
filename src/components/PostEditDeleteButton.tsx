import React from 'react'
import { Box, IconButton } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

interface PostEditDeleteButtonProps {}

const PostEditDeleteButton: React.FC<PostEditDeleteButtonProps> = (
  props: PostEditDeleteButtonProps
) => {
    return (
      <Box>
          <IconButton icon={<EditIcon />} aria-label="edit" mr={ 4}  />
          <IconButton icon={<DeleteIcon />} aria-label="edit" mr={ 4} colorScheme="red" />
      </Box>
    )
}

export default PostEditDeleteButton
