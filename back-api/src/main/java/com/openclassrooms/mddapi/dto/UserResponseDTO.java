package com.openclassrooms.mddapi.dto;

import com.openclassrooms.mddapi.models.TopicEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDTO {
     Long id;
     String username;
     String email;
     List<TopicEntity> subscriptions;
     LocalDate createdAt;
     LocalDate updatedAt;
}
