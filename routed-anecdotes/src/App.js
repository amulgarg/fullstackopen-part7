import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch, Route, Link, useRouteMatch, useParams, useHistory
} from "react-router-dom";
import { useField } from './hooks';

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link to="/" style={padding}>anecdotes</Link>
      <Link to='/create' style={padding}>create new</Link>
      <Link to='/about' style={padding}>about</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id} ><Link to={`anecdotes/${anecdote.id}`}>{anecdote.content}</Link></li>)}
    </ul>
  </div>
)

const Anecdote = ({ anecdotes }) => {
  const anecdoteId = useParams().id;
  const anecdote = anecdotes.find(a => a.id === anecdoteId);

  return <div>
    <h2>{anecdote.content}</h2>
    <p>has {anecdote.votes} votes </p>
    <p>for more info see: <a href={anecdote.info}>{anecdote.info}</a> </p>
  </div>
}

const About = () => {

  let { path, url } = useRouteMatch();

  return <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

      {/* <Switch>
        <Route exact path={path}>
          <h3>Please select a topic.</h3>
        </Route>
        <Route path={`${path}/otherpath`}>
          <div>Other path</div>
        </Route>
        <Route path={`${path}/:topicId`}>
          <div>Topic</div>
        </Route>
      </Switch>
     

    <Link to={`${path}/24`}>US</Link> */}
    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
}

const Footer = () => {
  console.log('Footer: I am rendering');
  return <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
}

const CreateNew = (props) => {
  const { reset: contentReset , ...content } = useField('text'); // renaming reset to contentReset to avoid conflicts with author and info
  const { reset: authorReset, ...author } = useField('text');
  const { reset: infoReset, ...info } = useField('text');
  const history = useHistory();


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    history.push('/');
  }

  const handleReset = (e) => {
    e.preventDefault();
    contentReset();
    authorReset();
    infoReset();
  }

  console.log('render: CreateNew');

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' {...content} />
        </div>
        <div>
          author
          <input name='author' {...author} />
        </div>
        <div>
          url for more info
          <input name='info' {...info} />
        </div>
        <button>create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])
  
  const [notification, setNotification] = useState('')
  
  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote));
    setNotification(`A new anecdote ${anecdote.content} created!`);
    window.setTimeout(() => (setNotification('')), 10000);
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Router>
        <Menu />
        {notification && <p>{notification}</p>}
        <Switch>
          <Route path="/create">
            <CreateNew addNew={addNew} />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/anecdotes/:id">
            <Anecdote anecdotes={anecdotes} />
          </Route>
          <Route path="/anecdotes">
            <AnecdoteList anecdotes={anecdotes} />
          </Route>
          <Route path="/">
            <AnecdoteList anecdotes={anecdotes} />
          </Route>
        </Switch>
      </Router>
      <Footer />
    </div>
  )
}

export default App;
