package io.srhojo.kotlin.secretsanta.dao.impl;

import io.srhojo.kotlin.secretsanta.dao.PlayersDao;
import io.srhojo.kotlin.secretsanta.dao.repositories.PlayerRepository;
import io.srhojo.kotlin.secretsanta.domain.entities.Player;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PlayerDaoImpl implements PlayersDao {


    private final PlayerRepository playerRepository;

    public PlayerDaoImpl(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    @Override
    public Player create(final Player player) {
        player.setId(null);
        return playerRepository.save(player);
    }

    @Override
    public Player update(final Player player) {
        if(!playerRepository.existsById(player.getId())){
            throw new RuntimeException(String.format("Cannot update. Entity not found ['%s']",player.getId()));
        }
        return playerRepository.save(player);
    }

    @Override
    public Player get(final Long id) {
        return playerRepository
                .findById(id)
                .orElseThrow(()-> new RuntimeException(String.format("Entity not found ['%s']",id)));
    }

    @Override
    public List<Player> getAll() {
        return playerRepository.findAll();
    }
}
