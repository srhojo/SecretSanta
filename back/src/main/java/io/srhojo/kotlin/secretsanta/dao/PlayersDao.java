package io.srhojo.kotlin.secretsanta.dao;

import io.srhojo.kotlin.secretsanta.domain.entities.Player;

import java.util.List;

public interface PlayersDao {

    Player create(Player player);

    Player update(Player player);

    Player get(Long id);

    List<Player> getAll();
}
