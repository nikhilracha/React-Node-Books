import React from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Feed from './Feed';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Collections from '@material-ui/icons/Collections';
import { Formik, ErrorMessage } from 'formik';


const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: 'grey',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'grey',
        }
    },
})(TextField);

const Layout = () => {
    const [feed, setFeed] = React.useState([]);
    const [genre, setGenre] = React.useState("");
    const [name, setName] = React.useState("");
    const [author, setAuthor] = React.useState("");
    const [bookFeed, setBookFeed] = React.useState({});

    const getFeed = () => {
        setBookFeed({});
        axios.get('http://localhost:9000/books')
            .then((response) => {
                console.log(response.data)
                setFeed(response.data);
            })
            .catch(err => console.log("Error", err))
    }

    const getFeedByGenre = () => {
        setBookFeed({});
        console.log(genre)
        axios.get(`http://localhost:9000/books/genre/${genre}`)
            .then((response) => {
                console.log(response.data)
                setFeed(response.data);
                setGenre("")
            })
            .catch(err => console.log("Error", err))
    }

    const getFeedByName = () => {
        console.log(name);
        setFeed([]);
        axios.get(`http://localhost:9000/books/name/${name}`)
            .then((response) => {
                console.log(response.data)
                setBookFeed(response.data);
                setName("")
            })
            .catch(err => console.log("Error", err))
    }

    const getFeedByAuthor = () => {
        setBookFeed({});
        console.log(author)
        axios.get(`http://localhost:9000/books/author/${author}`)
            .then((response) => {
                console.log(response.data)
                setFeed(response.data);
                setAuthor("");
            })
            .catch(err => console.log("Error", err))
    }
    const getFeedByAuthorGenre = (auth, gen) => {
        setBookFeed({});
        console.log("author and genre is ", auth, gen)
        axios.get(`http://localhost:9000/books/author/${auth}/genre/${gen}`)
            .then((response) => {
                console.log(response.data)
                setFeed(response.data);
            })
            .catch(err => console.log("Error", err))
    }

    const handleChange = (event) => {
        if (event.target.name === "genre_ip")
            setGenre(event.target.value);
        else if (event.target.name === "name_ip")
            setName(event.target.value)
        else if (event.target.name === "author_ip")
            setAuthor(event.target.value)
    };

    return (
        <div>
            <div style={{ marginTop: 20 }}>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={2}
                >
                    <Grid item>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => getFeed()}
                        >
                            GET All Books
                         </Button>
                    </Grid>
                    <Grid item>
                        <CssTextField
                            name="genre_ip"
                            value={genre}
                            onChange={handleChange}
                            label="Search by Genre"
                        />
                        <IconButton onClick={() => getFeedByGenre()} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <CssTextField
                            name="name_ip"
                            value={name}
                            onChange={handleChange}
                            label="Search by Name"
                        />
                        <IconButton onClick={() => getFeedByName()} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <CssTextField
                            name="author_ip"
                            value={author}
                            onChange={handleChange}
                            label="Search by Author"
                        />
                        <IconButton onClick={() => getFeedByAuthor()} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item>
                        <div style={{ marginTop: 20 }}>
                            <Formik
                                initialValues={{ author: '', genre: '' }}
                                validate={values => {
                                    const errors = {};
                                    if (!values.author) {
                                        errors.author = '*';
                                    } if (!values.genre) {
                                        errors.genre = '*';
                                    }
                                    return errors;
                                }}
                                onSubmit={(values, { setSubmitting, resetForm }) => {
                                    setTimeout(() => {
                                        getFeedByAuthorGenre(values.author, values.genre);
                                        setSubmitting(false);
                                        resetForm({});

                                    }, 400);
                                }}
                            >
                                {({
                                    values,
                                    errors,
                                    touched,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                    isSubmitting,
                                    /* and other goodies */
                                }) => (
                                        <form onSubmit={handleSubmit}>
                                            <Grid container spacing={1} alignItems="flex-end">
                                                <Grid item>
                                                    <AccountCircle color="action" />
                                                </Grid>
                                                <Grid item>
                                                    <CssTextField
                                                        name="author"
                                                        value={values.author}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        label="Enter Author's name"
                                                    />
                                                    <ErrorMessage name="author" render={msg => <span style={{ color: 'red' }}>{msg}</span>} />
                                                </Grid>
                                                <Grid item>
                                                    <Collections color="action" />
                                                </Grid>
                                                <Grid item>
                                                    <CssTextField
                                                        name="genre"
                                                        value={values.genre}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        label="Enter the genre"
                                                    />
                                                    <ErrorMessage name="genre" render={msg => <span style={{ color: 'red' }}>{msg}</span>} />
                                                </Grid>
                                                <Grid item>
                                                    <IconButton type="submit" disabled={isSubmitting} aria-label="search">
                                                        <SearchIcon />
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                        </form>
                                    )}
                            </Formik>
                        </div>

                    </Grid>
                </Grid>

            </div>

            <Feed books={feed} book={bookFeed} />
        </div>
    );
}

export default Layout;
