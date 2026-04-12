package com.hotel.backend.adapter.out.persistence.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Integer> {
    Optional<UserEntity> findByUsername(String username);

    boolean existsByUsername(String username);

    boolean existsByUsernameAndIdNot(String username, Integer id);

    @Query("""
            select u from UserEntity u
            where (:keyword is null
                or lower(u.username) like lower(concat('%', :keyword, '%'))
                or lower(u.fullName) like lower(concat('%', :keyword, '%'))
                or lower(coalesce(u.mail, '')) like lower(concat('%', :keyword, '%')))
            order by u.username asc
            """)
    List<UserEntity> search(@Param("keyword") String keyword);

    @Query(value = """
            select case when (
                (select count(*) from bookings b where b.user_id = :userId) +
                (select count(*) from bills bi where bi.user_id = :userId)
            ) > 0 then true else false end
            """, nativeQuery = true)
    boolean hasRelatedOperationalData(@Param("userId") Integer userId);
}
