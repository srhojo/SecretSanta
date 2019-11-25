package io.srhojo.kotlin.secretsanta.services;

import io.srhojo.kotlin.secretsanta.domain.entities.Player;

import java.util.List;

public interface SantaSecretService {

    Player createPlayer(Player player);

    Player updatePlayer(Player player);

    Player getPlayerById(Long id);

    List<Player> getAllPlayer();
}
