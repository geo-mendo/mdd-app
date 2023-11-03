package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.dto.*;
import com.openclassrooms.mddapi.models.PostEntity;
import com.openclassrooms.mddapi.models.TopicEntity;
import com.openclassrooms.mddapi.models.UserEntity;
import com.openclassrooms.mddapi.repositories.TopicRepository;
import com.openclassrooms.mddapi.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Streamable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class TopicService {

    @Autowired
    private TopicRepository topicRepository;

    public TopicService() {}


    public List<TopicResponseDTO> getAllTopics() {
        List<TopicEntity> topics = Streamable.of(topicRepository.findAll()).toList();
        List<TopicResponseDTO> topicsDto = new ArrayList<>();
        topics.forEach( topic -> topicsDto.add(mapTopicEntityToDTO(topic)));
        return topicsDto;
    }

    public TopicResponseDTO addNewTopic(TopicRequestDTO newTopic) {
        TopicEntity newTopicEntity = toEntity(newTopic);
        TopicEntity topicCreated = topicRepository.save(newTopicEntity);
        return  mapTopicEntityToDTO(topicCreated);
    }

    public TopicResponseDTO mapTopicEntityToDTO(TopicEntity topicToMap){
        return new TopicResponseDTO(
                topicToMap.getId(),
                topicToMap.getTitle(),
                topicToMap.getDescription()
        );
    }

    public TopicEntity toEntity(TopicRequestDTO dto) {

        return TopicEntity.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .build();
    }

}
