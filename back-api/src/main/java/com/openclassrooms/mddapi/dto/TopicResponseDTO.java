package com.openclassrooms.mddapi.dto;

import com.openclassrooms.mddapi.models.UserEntity;
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
public class TopicResponseDTO {
    Long id;
    String title ;
    String description;
}
