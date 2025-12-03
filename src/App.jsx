import './App.css';

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import TaskList from './components/TaskList.jsx';
import TaskCreate from './components/TaskCreate.jsx';
import TaskEdit from './components/TaskEdit.jsx';
import TagList from './components/TagList.jsx';
import SimpleTest from './components/SimpleTest.jsx';
import Welcome from './components/Welcome.jsx';
import Button from './components/Button.jsx';
import InputForm from './components/InputForm.jsx';
import Counter from './components/Counter.jsx';
import TimerCounter from './components/TimerCounter.jsx';
import InputFocus from './components/InputFocus.jsx';
import VariantCounter from './components/VariantCounter.jsx';
import ChartComponent from './components/ChartComponent.jsx';

function App() {
  return (
    <div>
      <SimpleTest/>
      <Welcome name="Kim"/>
      <Button/>
      <InputForm/>
      <Counter/>
      <TimerCounter seconds={2} />
      <InputFocus/>
      <VariantCounter/>
      <ChartComponent/>

      <BrowserRouter>
        <nav style={{ padding: 8 }}>
          <Link to="/">Tasks</Link>
          {' | '}
          <Link to="/tags">Tags</Link>
          {' | '}
          <Link to="/tasks/new">New Task</Link>
        </nav>

        <Routes>
          <Route path='/' element={<TaskList />} />
          <Route path='/tasks/new' element={<TaskCreate />} />
          <Route path='/tasks/:id/edit' element={<TaskEdit />} />
          <Route path="/tags" element={<TagList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
