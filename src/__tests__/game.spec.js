'use strict';

const request = require('supertest');
const uuid = require('uuid/v4');
const host = 'http://localhost:3000';

describe('Game', () => {

  it('should successfully request single game by id', (done) => {
    const playerId = 'eade1f90-13d6-4575-9948-228e4625030d';
    request(host)
      .get(`/api/v1/players/${playerId}`)
      .expect(200)
      .then(({body:player}) => {
        expect(player.id).toEqual(playerId);
        expect(player.email).toEqual('aveing@mailinator.com');
        expect(player.games.length).toEqual(2);
        done();
      });
  });

  it('should successfully request all games', (done) => {
    request(host)
      .get(`/api/v1/games`)
      .expect(200)
      .then(({body:games}) => {
        const unreal = games.find(game => game.slug === 'unreal-tournament');
        const mgs = games.find(game => game.slug === 'mgs');
        expect(unreal).toBeDefined();
        expect(mgs).toBeDefined();
        expect(unreal.founder.slug).toEqual('epic-games');
        expect(mgs.founder.slug).toEqual('konami');
        done();
      });
  });

  it('should successfully create a game', (done) => {
    const publisherId = '4f6de11d-aadf-4246-8c04-0feb7535d3a8';
    const developerId = '570fbd7a-fbbb-4eb9-b24d-bb8bd753ead5';
    const toBeCreatedGame = {
      name: 'WarCraft 3',
      slug: 'warcraft-3',
      founder: publisherId,
      leadDeveloper: developerId
    }

    request(host)
      .post(`/api/v1/games`)
      .send(toBeCreatedGame)
      .expect(201)
      .then(({body:game}) => {
        expect(game.slug).toEqual(toBeCreatedGame.slug);
        expect(game.name).toEqual(toBeCreatedGame.name);
        expect(game.founder.id).toEqual(toBeCreatedGame.founder);
        expect(game.leadDeveloper.id).toEqual(toBeCreatedGame.leadDeveloper);
        done();
      });

  });

  it('should successfully create game with founder and lead engineer', (done) => {
    const toBeCreatedGame = {
      name: 'fallout',
      slug: 'fallout',
      founder: {
        name: 'Bethesda',
        slug: 'bethesda'
      },
      leadDeveloper: {
        name: 'Leonard Boyarsky',
        slug: 'lboyarsky'
      }
    };

    request(host)
      .post(`/api/v1/games`)
      .send(toBeCreatedGame)
      .expect(201)
      .then(({body:game}) => {
        expect(game.name).toEqual(toBeCreatedGame.name);
        expect(game.slug).toEqual(toBeCreatedGame.slug);
        expect(game.founder.slug).toEqual(toBeCreatedGame.founder.slug);
        expect(game.leadDeveloper.slug).toEqual(toBeCreatedGame.leadDeveloper.slug);
        done();
      });

  });

  it('should successfully update a game by id', (done) => {
    const gameId = '67a40797-b0b0-4e4c-8fbe-285a02445e41';
    const nextName = 'Unreal T 2';
    request(host)
      .patch(`/api/v1/games/${gameId}`)
      .send({name: nextName})
      .expect(200)
      .then(({body:game}) => {
        expect(game.name).toEqual(nextName);
        done();
      })
  });

  it('should successfully remove a game by id', (done) => {
    const gameId = 'dc5b2cd0-3296-4f3b-a8e2-a95d26cb4322';
    request(host)
      .delete(`/api/v1/games/${gameId}`)
      .send()
      .expect(202, done);
  });

  it('should fail to create a game without required fields', (done) => {
    request(host)
      .post('/api/v1/games')
      .send({})
      .expect(400, done)
  });

  it('should fail to create a game with invalid publisher', (done) => {
    request(host)
      .post('/api/v1/games')
      .send({
        name: 'random game',
        slug: 'rand-game',
        founder: uuid(),
        leadDeveloper: 'aa067f24-47b0-4580-a83f-1096119bed41'
      })
      .expect(400, done)
  });

  it('should fail to create a game with invalid developer', (done) => {
    request(host)
      .post('/api/v1/games')
      .send({
        name: 'random game',
        slug: 'rand-game',
        founder: 'f3ac3539-133e-45e9-8410-7a322548065c',
        leadDeveloper: uuid()
      })
      .expect(400, done)
  });

  it('should fail to create a game with duplicated slug', (done) => {
    request(host)
      .post('/api/v1/games')
      .send({
        name: 'random game',
        slug: 'zone-66',
        founder: 'f3ac3539-133e-45e9-8410-7a322548065c',
        leadDeveloper: '57c3b60c-23f6-4895-b8dc-6049f70d31ed'
      })
      .expect(400, done)
  });

  it('should fail to update a game with provided invalid id', (done) => {
    request(host)
      .patch(`/api/v1/games/${uuid()}`)
      .send({
        name: 'random game'
      })
      .expect(404, done)
  });

  it('should fail to remove a game if player still has one', (done) => {
    const gameId = '67a40797-b0b0-4e4c-8fbe-285a02445e41';
    request(host)
      .delete(`/api/v1/games/${gameId}`)
      .send()
      .expect(409, done)
  });

  it('should fail to remove a game with provided invalid id', (done) => {
    request(host)
      .delete(`/api/v1/games/abc`)
      .send()
      .expect(400, done)
  });

});