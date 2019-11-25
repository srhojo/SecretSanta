package io.srhojo.kotlin.secretsanta.services.impl;

import io.srhojo.kotlin.secretsanta.dao.PlayersDao;
import io.srhojo.kotlin.secretsanta.domain.entities.Player;
import io.srhojo.kotlin.secretsanta.services.SantaSecretService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SantaSecretServiceImpl implements SantaSecretService {

    private final PlayersDao playersDao;

    public SantaSecretServiceImpl(PlayersDao playersDao) {
        this.playersDao = playersDao;
    }

    @Override
    public Player createPlayer(Player player) {
        return playersDao.create(player);
    }

    @Override
    public Player updatePlayer(Player player) {
        return playersDao.update(player);
    }

    @Override
    public Player getPlayerById(Long id) {
        return playersDao.get(id);
    }

    @Override
    public List<Player> getAllPlayer() {
        return playersDao.getAll();
    }
}
