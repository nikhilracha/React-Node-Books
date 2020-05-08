import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Grid from '@material-ui/core/Grid';

const BookC = (props) => (
    <Card className={props.classes.root} variant="outlined">
        <CardContent>
            <Typography variant="h5" component="h2">
                {props.feed.title}
            </Typography>
            <Typography className={props.classes.pos} color="textSecondary">
                {props.feed.author[0]}
            </Typography>
            <Typography variant="body2" component="p">
                {props.feed.edition}
            </Typography>
            <Typography variant="body2" component="p">
                {props.feed.genre}
            </Typography>
            <Typography variant="body2" component="p">
                Page Count: {props.feed.page_count}
            </Typography>
            <Typography variant="body2" component="p">
                Publication: {props.feed.publication}
            </Typography>
            <Typography variant="body2" component="p">
                Published Year: {props.feed.published_year}
            </Typography>
        </CardContent>
    </Card>
)


const Feed = (props) => {
    const classes = useStyles();
    const feed = props.books;
    const book = props.book;
    let col = feed.length > 3 ? 4 : feed.length === 1 ? 1 : 3;
    return (
        <>
            <div className={classes.root}>
                <Grid container>
                    <GridList cellHeight={280} className={classes.gridList} cols={col}>
                        {feed.length > 0 ? feed.map((u, i) =>
                            (
                                <GridListTile className={classes.list} key={u.title} cols={1}>
                                    <BookC feed={u} classes={classes} />
                                </GridListTile>
                            )) :
                            <GridListTile className={classes.list} cols={1}>
                                <p>{feed.error}</p>
                            </GridListTile>

                        }
                    </GridList>
                    {JSON.stringify(book) !== '{}' ? book.error ? <p>{book.error}</p> : (
                        <Grid className={classes.list} item>
                            <BookC feed={book} classes={classes} />
                        </Grid>
                    ) : (<></>)}
                </Grid>
            </div>
        </>
    )
}

const useStyles = makeStyles({
    cardroot: {
        minWidth: 275,
    },
    gridList: {
        height: 900,
    },
    list: {
        marginLeft: 50,
        marginRight: 50
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        marginTop: 20
    },
    card: {
        width: 200
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});




export default Feed;