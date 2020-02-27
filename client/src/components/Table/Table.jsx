import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Skeleton from "@material-ui/lab/Skeleton";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

const axios = require("axios");
const moment = require("moment");

const GET_POSTS_API_URL = "http://localhost/api/posts";
const HIDE_POST_API_URL = "http://localhost/api/hide-post/";

const useStyles = makeStyles({
  root: {
    paddingBottom: "50px"
  },
  row: {
    backgroundColor: "#fff",
    border: "1px #ccc",
    "&:hover": {
      backgroundColor: "fafafa !important"
    }
  },
  title: {
    color: "#333",
    fontSize: "13pt"
  },
  author: {
    color: "#999"
  },
  deleteButton: {
    zIndex: "1000"
  }
});

export default function StickyHeadTable() {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [controlledRows, setControlledRows] = React.useState([]);

  const loadPosts = async () => {
    setLoading(true);
    try {
      await axios.get(GET_POSTS_API_URL).then(res => {
        setControlledRows(res.data.map(item => ({ ...item, deleted: false })));
        setRows(res.data);
        setLoading(false);
      });
    } catch (error) {
      //error
      setLoading(false);
      console.error(error);
    }
  };
  React.useEffect(() => {
    loadPosts();
  }, []);

  const handleClick = async (e, id) => {
    try {
      await axios.put(HIDE_POST_API_URL + id).then(res => {
        loadPosts();
      });
    } catch (error) {
      //error
      setLoading(false);
      console.error(error);
    }
  };

  // if (rows.length === 0) return null;
  return (
    <div className={classes.root}>
      <TableContainer component={Paper}>
        <Table>
          {loading ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={10}>
                  <Skeleton variant="rect" width="100%" height={300} />
                  <Skeleton width="100%" />
                  <Skeleton width="60%" />
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {controlledRows.map((row, idx) => {
                const {
                  title,
                  story_title,
                  url,
                  story_url,
                  created_at,
                  author,
                  objectID
                } = row;
                const titleToShow = story_title
                  ? story_title
                  : title
                  ? title
                  : null;
                const urlToShow = story_url ? story_url : url;
                if (!titleToShow) return null;
                return (
                  <React.Fragment>
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={idx}
                      className={classes.row}
                      onClick={() => window.open(urlToShow, "_blank")}
                    >
                      <TableCell
                        component="th"
                        colSpan={8}
                        className={classes.title}
                      >
                        {titleToShow}
                        <span className={classes.author}> - {author} - </span>
                      </TableCell>
                      <TableCell component="th" scope="row" colSpan={1}>
                        {moment(created_at, "YYYYMMDD").fromNow()}
                      </TableCell>

                      <TableCell colSpan={1} padding="checkbox">
                        <IconButton
                          className={classes.deleteButton}
                          onClick={e => handleClick(e, objectID)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                );
              })}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </div>
  );
}
