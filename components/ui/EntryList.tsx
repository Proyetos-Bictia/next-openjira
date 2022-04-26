import { DragEvent, FC, useContext, useMemo } from 'react';
import { List, Paper } from '@mui/material';

import { EntriesConext } from '../../context/entries';
import { UIConext } from '../../context/ui';

import { EntryCard } from './EntryCard';
import { EntryStatus } from '../../interfaces';

import style from './EntryList.module.css'

interface Props {
  status: EntryStatus
}

export const EntryList: FC<Props> = ({ status }) => {
  const { entries, updateEntry } = useContext(EntriesConext);
  const { isDragging, endDragging } = useContext(UIConext);

  const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status), [entries])

  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }

  const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData('text');

    const entry = entries.find(e => e._id === id)!;
    entry.status = status
    updateEntry(entry);
    endDragging();
  }



  return (
    // aqí haremos drop
    <div
      onDrop={onDropEntry}
      onDragOver={allowDrop}
      className={isDragging ? style.dragging : ''}
    >
      <Paper sx={{ height: 'calc(100vh - 250px)', overflowY: 'auto', backgroundColor: 'transparent', padding: '1px 3px' }}>
        <List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all .3s' }}>
          {
            entriesByStatus.map(entry => (
              <EntryCard key={entry._id} entry={entry} />
            ))
          }
        </List>
      </Paper>
    </div>
  )
}
