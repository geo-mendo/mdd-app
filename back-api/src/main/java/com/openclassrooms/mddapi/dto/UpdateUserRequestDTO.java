package com.openclassrooms.mddapi.dto;

import com.openclassrooms.mddapi.models.TopicEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateUserRequestDTO {

     String username;
     String email;
     String password;
}
