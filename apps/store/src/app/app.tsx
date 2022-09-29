import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';

import { Header } from '@nxegghead/store/ui-shared';
import { Game } from '@nxegghead/api/util-interfaces';

import './app.scss';

function formatRating(rating: number) {
  return `${Math.round(rating * 100) / 10} / 10`;
}

export const App = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<{
    data: Game[];
    loadingState: 'success' | 'error' | 'loading';
  }>({
    data: [],
    loadingState: 'success',
  });

  useEffect(() => {
    setState((s) => ({
      ...s,
      loadingState: 'loading',
    }));
    fetch('/api/games')
      .then((x) => x.json())
      .then((res) => {
        setState((s) => ({
          ...s,
          data: res,
          loadingState: 'success',
        }));
      })
      .catch((err) => {
        setState((s) => ({
          ...s,
          loadingState: 'error',
        }));
      });
  }, []);

  return (
    <>
      <Header title="Board Game Hoard" />
      <div className="container" data-testid="app-container">
        <div className="games-layout">
          {state.loadingState === 'loading'
            ? 'Loading...'
            : state.loadingState === 'error'
            ? '<div>Error retrieving data</div>'
            : state.data.map((x) => (
                <Card
                  key={x.id}
                  className="game-card"
                  onClick={() => navigate(`/game/${x.id}`)}
                >
                  <CardActionArea>
                    <CardMedia
                      className="game-card-media"
                      image={x.image}
                      title={x.name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {x.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {x.description}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        className="game-rating"
                      >
                        <strong>Rating:</strong> {formatRating(x.rating)}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))}
        </div>
      </div>
    </>
  );
};

export default App;
