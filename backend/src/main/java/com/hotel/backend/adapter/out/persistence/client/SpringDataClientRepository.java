package com.hotel.backend.adapter.out.persistence.client;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SpringDataClientRepository extends JpaRepository<ClientEntity, Integer>, JpaSpecificationExecutor<ClientEntity> {

    @Query("""
            select c
            from ClientEntity c
            where replace(replace(replace(replace(replace(c.phone, ' ', ''), '-', ''), '(', ''), ')', ''), '+', '') = :normalizedPhone
            order by c.id asc
            """)
    Optional<ClientEntity> findFirstByNormalizedPhone(@Param("normalizedPhone") String normalizedPhone);

    boolean existsByIdCardNumber(String idCardNumber);

    boolean existsByIdCardNumberAndIdNot(String idCardNumber, Integer id);

    @Query("""
            select count(c) > 0
            from ClientEntity c
            where replace(replace(replace(replace(replace(coalesce(c.phone, ''), ' ', ''), '-', ''), '(', ''), ')', ''), '+', '') = :normalizedPhone
            """)
    boolean existsByNormalizedPhone(@Param("normalizedPhone") String normalizedPhone);

    @Query("""
            select count(c) > 0
            from ClientEntity c
            where c.id <> :id
              and replace(replace(replace(replace(replace(coalesce(c.phone, ''), ' ', ''), '-', ''), '(', ''), ')', ''), '+', '') = :normalizedPhone
            """)
    boolean existsByNormalizedPhoneAndIdNot(@Param("normalizedPhone") String normalizedPhone, @Param("id") Integer id);
}
