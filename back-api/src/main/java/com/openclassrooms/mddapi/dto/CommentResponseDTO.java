package com.openclassrooms.mddapi.dto;

import com.openclassrooms.mddapi.models.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentResponseDTO {
    String content;
    UserEntity user;
}
