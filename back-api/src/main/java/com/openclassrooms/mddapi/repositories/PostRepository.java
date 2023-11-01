package com.openclassrooms.mddapi.repositories;


import com.openclassrooms.mddapi.models.PostEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends CrudRepository<PostEntity, Long> {
}
