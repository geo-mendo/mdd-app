package com.openclassrooms.mddapi.repositories;

import com.openclassrooms.mddapi.models.CommentEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends CrudRepository<CommentEntity, Long> {
}
