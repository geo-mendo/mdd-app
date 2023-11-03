package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.dto.PostRequestDTO;
import com.openclassrooms.mddapi.dto.PostResponseDTO;
import com.openclassrooms.mddapi.exceptions.PostNotFoundException;
import com.openclassrooms.mddapi.models.PostEntity;
import com.openclassrooms.mddapi.models.TopicEntity;
import com.openclassrooms.mddapi.models.UserEntity;
import com.openclassrooms.mddapi.repositories.PostRepository;
import com.openclassrooms.mddapi.repositories.TopicRepository;
import com.openclassrooms.mddapi.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Streamable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class PostService {


    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TopicRepository topicRepository;

    @Autowired
    private UserService userService;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public PostEntity getPostById(Long id) {
        return postRepository
                .findById(id)
                .orElseThrow(() -> new PostNotFoundException(id));
    }

    public List<PostResponseDTO> getAllPosts() {
        List<PostResponseDTO> postsResponseDTO = new ArrayList<>();
        List<PostEntity> posts = Streamable.of(postRepository.findAll()).toList();
        posts.forEach(postEntity -> postsResponseDTO.add(mapPostEntityToDTO(postEntity)) );
        return postsResponseDTO;
    }

    public PostResponseDTO addNewRental(PostRequestDTO newPost) {
        PostEntity newPostEntity = toEntity(newPost);
        PostEntity postCreated = postRepository.save(newPostEntity);
        return  mapPostEntityToDTO(postCreated);
    }


    public PostResponseDTO mapPostEntityToDTO(PostEntity postToMap){
        return new PostResponseDTO(
                postToMap.getId(),
                postToMap.getTitle(),
                postToMap.getContent(),
                userService.mapUserEntityToDTO(postToMap.getAuthor()),
                postToMap.getTopic(),
                postToMap.getComments(),
                postToMap.getCreatedAt()
        );
    }

    public PostEntity toEntity(PostRequestDTO dto) {

        UserEntity author = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        TopicEntity topic = topicRepository.findById(dto.getTopicId())
                .orElseThrow(() -> new RuntimeException("thème non trouvé"));

        return PostEntity.builder()
                .title(dto.getTitle())
                .content(dto.getContent())
                .author(author)
                .topic(topic)
                .createdAt(LocalDate.now())
                .build();
    }

}
