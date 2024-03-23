import TodoList from './components/TodoList/TodoList';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: ['Encode Sans Expanded', 'sans-serif'].join(','),
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <TodoList />
    </ThemeProvider>
  );
}

export default App;
