import React, {useState,useEffect} from 'react';
import { getSearchHistory, deleteSearch } from '../services/api';
import { List, ListItem, IconButton, Container, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const History = () => {
  const [history, setHistory] = useState([]);
  useEffect(() => {
    getSearchHistory().then(r=>setHistory(r.data));
  }, []);
  const onDel = async id => {
    await deleteSearch(id);
    setHistory(history.filter(h=>h.id!==id));
  };
  return (
    <Container sx={{py:4}}>
      <Typography variant="h4" gutterBottom>Search History</Typography>
      <List>
        {history.map(h => (
          <ListItem
            key={h.id}
            secondaryAction={
              <IconButton edge="end" onClick={()=>onDel(h.id)}>
                <DeleteIcon/>
              </IconButton>
            }
          >
            {h.query} <em>({new Date(h.timestamp).toLocaleString()})</em>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default History;
