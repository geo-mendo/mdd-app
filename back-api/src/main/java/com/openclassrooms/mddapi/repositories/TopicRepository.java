package com.openclassrooms.mddapi.repositories;


import com.openclassrooms.mddapi.models.PostEntity;
import com.openclassrooms.mddapi.models.TopicEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TopicRepository extends CrudRepository<TopicEntity, Long> {
}
