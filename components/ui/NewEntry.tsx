import { ChangeEvent, useContext, useState } from 'react';
import { Box, Button, TextField } from '@mui/material'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

import { EntriesConext } from '../../context/entries';
import { UIConext } from '../../context/ui';

export const NewEntry = () => {
  const [inputValue, setInputValue] = useState('');
  const [touched, setTouched] = useState(false);

  const { isAddingEntry, setIsAddingEntry } = useContext(UIConext)

  const { addNewEntry } = useContext(EntriesConext)

  const onTextFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const onSave = () => {
    if(inputValue.length === 0) return;
    addNewEntry(inputValue);
    setInputValue('');
    setTouched(false);
    setIsAddingEntry(false)
  }

  return (
    <Box sx={{ marginBottom: 2, paddingX: 2 }}>

      {
        isAddingEntry
          ? (
            <>
              <TextField
                fullWidth
                sx={{ marginTop: 2, marginBottom: 1 }}
                placeholder='Nueva entrada'
                autoFocus
                multiline
                label={'Nueva entrada'}
                error={inputValue.length <= 0 && touched}
                helperText={inputValue.length <= 0 && touched && 'Valor no valido'}
                value={inputValue}
                onChange={onTextFieldChange}
                onBlur={() => setTouched(true)}
              />

              <Box display={'flex'} justifyContent='space-between'>
                <Button
                  variant='text'
                  onClick={() => setIsAddingEntry(false)}
                >
                  Cancelar
                </Button>
                <Button
                  variant='outlined'
                  color='secondary'
                  endIcon={<SaveOutlinedIcon />}
                  onClick={onSave}
                >
                  Guardar
                </Button>
              </Box>
            </>
          ) : (
            <Button
              startIcon={<AddBoxOutlinedIcon />}
              fullWidth
              variant='outlined'
              onClick={() => setIsAddingEntry(true)}
            >
              Agregar Tarea
            </Button>
          )
      }

    </Box>
  )
}
