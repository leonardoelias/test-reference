import React from 'react';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';

import Wrap from '../../components/wrap';

const useStyles = makeStyles((theme) => ({
  card: {
    width: '100%',
    marginBottom: theme.spacing(1),
  },
}));

function UserSkeleton() {
  return new Array(6).fill(1).map((_, i) => {
    return (
      <Box mb={1}>
        <Card key={`skeleton_card_${i}`}>
          <CardHeader
            avatar={
              <Skeleton
                animation='wave'
                variant='circle'
                width={40}
                height={40}
              />
            }
            title={
              <Skeleton
                animation='wave'
                height={10}
                width='80%'
                style={{ marginBottom: 6 }}
              />
            }
            subheader={<Skeleton animation='wave' height={10} width='50%' />}
          />
        </Card>
      </Box>
    );
  });
}

function getUsers() {
  return fetch('https://reqres.in/api/users?delay=3').then((response) =>
    response.json()
  );
}

export default function Login() {
  const classes = useStyles();
  const [data, setData] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    setLoading(true);

    getUsers()
      .then((json) => setData(json.data))
      .catch((err) => {
        console.error(err);
        setData([]);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (error) {
    return <Wrap>"Oops!"</Wrap>;
  }

  return (
    <Wrap>
      <Box display='flex' flexDirection='column' width={1}>
        <Typography variant='h5' gutterBottom={true}>
          Lista de usuários
        </Typography>
        <Box width={1} mt={1}>
          {isLoading ? (
            <UserSkeleton className={classes.card} />
          ) : (
            Array.isArray(data) &&
            data.map((user) => (
              <Card className={classes.card}>
                <CardHeader
                  avatar={<Avatar aria-label='recipe' src={user.avatar} />}
                  title={`${user.first_name} ${user.last_name}`}
                  subheader={user.email}
                />
              </Card>
            ))
          )}
        </Box>
      </Box>
    </Wrap>
  );
}
