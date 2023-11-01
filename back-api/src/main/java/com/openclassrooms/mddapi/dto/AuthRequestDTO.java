package com.openclassrooms.mddapi.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthRequestDTO {

    @JsonProperty("email")
    String email;
    @JsonProperty("password")
    String password;

}
