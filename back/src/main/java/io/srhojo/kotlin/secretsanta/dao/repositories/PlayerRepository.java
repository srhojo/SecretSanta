package io.srhojo.kotlin.secretsanta.dao.repositories;

import io.srhojo.kotlin.secretsanta.domain.entities.Player;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayerRepository extends JpaRepository<Player, Long> {
}
