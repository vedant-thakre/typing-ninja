import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { getRelativeTime, handleTabTitle } from '../../utils/helper'
import { useDispatch, useSelector } from 'react-redux';
import AnimatedButton from '../AnimatedButton';
import { GoDotFill } from 'react-icons/go';
import CommentReplyBox from './CommentReplyBox';
import CommentBox from './CommentBox';
import { getPost } from '../../store/slices/postSlice';

const post = {
  _id: 2201,
  author: {
    _id: 84082,
    username: "melly",
    isAdmin: false,
    insertedAt: "2025-02-06T16:18:55Z",
  },
  title: "Thursday ❤️",
  body: "Saying of the day, \"You cannot do long lasting work with motivation, instead discipline.\"\n\nHope everyone's doing AMAZINGGGGGGG hope y'all are doing well today, today is my Fr_iday! so I wont be back until Monday :) finally getting out of alternative school and going into pace!",
  comments: [
    {
      _id: 29259,
      author: {
        _id: 86365,
        username: "hxnnahh",
        isAdmin: false,
        insertedAt: "2025-02-14T12:36:43Z",
      },
      depth: 0,
      body: "uh ok",
      comments: [],
      replyable: true,
      createdAt: "2025-02-14T14:28:40Z",
    },
    {
      _id: 29261,
      author: {
        _id: 86365,
        username: "hxnnahh",
        isAdmin: false,
        insertedAt: "2025-02-14T12:36:43Z",
      },
      depth: 0,
      body: "are you gonna write a diary on here or something ",
      comments: [
        {
          _id: 29325,
          author: {
            _id: 84082,
            username: "melly",
            isAdmin: false,
            insertedAt: "2025-02-06T16:18:55Z",
          },
          depth: 1,
          body: "well i've noticed that nobody uses the discussions, so just to keep it active I'm doing it everyday, and also trying to remind people that they matter. ",
          comments: [],
          replyable: true,
          createdAt: "2025-02-17T14:50:28Z",
        },
      ],
      replyable: true,
      createdAt: "2025-02-14T14:45:06Z",
    },
    {
      _id: 29262,
      author: {
        _id: 86365,
        username: "hxnnahh",
        isAdmin: false,
        insertedAt: "2025-02-14T12:36:43Z",
      },
      depth: 0,
      body: "willing to read it tho",
      comments: [
        {
          _id: 29293,
          author: {
            _id: 9037,
            username: "NOT A LEMONADE",
            isAdmin: false,
            insertedAt: "2022-07-07T10:33:34Z",
          },
          depth: 1,
          body: "You could've just sa_id that whole thing in just one line too yk. (Just a suggestion)",
          comments: [],
          replyable: true,
          createdAt: "2025-02-16T17:35:32Z",
        },
      ],
      replyable: true,
      createdAt: "2025-02-14T14:45:13Z",
    },
    {
      _id: 30084,
      author: {
        _id: 90903,
        username: "oohkay",
        isAdmin: false,
        insertedAt: "2025-03-06T15:17:11Z",
      },
      depth: 0,
      body: "yay! today is thursday, and since I d_idn't exactly want to make a post.. I dec_ided that I would comment one that has the week day :3\n\nI'm very new to \"typer.io\", and I like it! I'm gonna try to come back every day...\n\nanyways, as positivity as I always say... have a great day <3",
      comments: [
        {
          _id: 30085,
          author: {
            _id: 84082,
            username: "melly",
            isAdmin: false,
            insertedAt: "2025-02-06T16:18:55Z",
          },
          depth: 1,
          body: "OMG HEYYYY!!! hope you're having an amazing day :))) <3",
          comments: [
            {
              _id: 300855,
              author: {
                _id: 84082,
                username: "melly",
                isAdmin: false,
                insertedAt: "2025-02-06T16:18:55Z",
              },
              depth: 1,
              body: "OMG HEYYYY!!! hope you're having an amazing day :))) <3",
              comments: [
                {
                  _id: 302085,
                  author: {
                    _id: 84082,
                    username: "melly",
                    isAdmin: false,
                    insertedAt: "2025-02-06T16:18:55Z",
                  },
                  depth: 1,
                  body: "OMG HEYYYY!!! hope you're having an amazing day :))) <3",
                  comments: [
                    {
                      _id: 301085,
                      author: {
                        _id: 84082,
                        username: "melly",
                        isAdmin: false,
                        insertedAt: "2025-02-06T16:18:55Z",
                      },
                      depth: 1,
                      body: "OMG HEYYYY!!! hope you're having an amazing day :))) <3",
                      comments: [
                        {
                          _id: 130085,
                          author: {
                            _id: 84082,
                            username: "melly",
                            isAdmin: false,
                            insertedAt: "2025-02-06T16:18:55Z",
                          },
                          depth: 1,
                          body: "OMG HEYYYY!!! hope you're having an amazing day :))) <3",
                          comments: [
                            {
                              _id: 3033085,
                              author: {
                                _id: 84082,
                                username: "melly",
                                isAdmin: false,
                                insertedAt: "2025-02-06T16:18:55Z",
                              },
                              depth: 1,
                              body: "OMG HEYYYY!!! hope you're having an amazing day :))) <3",
                              comments: [
                                {
                                  _id: 3024085,
                                  author: {
                                    _id: 84082,
                                    username: "melly",
                                    isAdmin: false,
                                    insertedAt: "2025-02-06T16:18:55Z",
                                  },
                                  depth: 1,
                                  body: "OMG HEYYYY!!! hope you're having an amazing day :))) <3",
                                  comments: [],
                                  replyable: true,
                                  createdAt: "2025-03-06T17:38:14Z",
                                },
                              ],
                              replyable: true,
                              createdAt: "2025-03-06T17:38:14Z",
                            },
                          ],
                          replyable: true,
                          createdAt: "2025-03-06T17:38:14Z",
                        },
                      ],
                      replyable: true,
                      createdAt: "2025-03-06T17:38:14Z",
                    },
                  ],
                  replyable: true,
                  createdAt: "2025-03-06T17:38:14Z",
                },
              ],
              replyable: true,
              createdAt: "2025-03-06T17:38:14Z",
            },
          ],
          replyable: true,
          createdAt: "2025-03-06T17:38:14Z",
        },
      ],
      replyable: true,
      createdAt: "2025-03-06T16:20:13Z",
    },
  ],
  createdAt: "2025-02-13T15:07:18Z",
  downvotes: 0,
  upvotes: 0,
  commentCount: 7,
  updatedAt: "2025-03-06T17:38:14Z",
  visitCount: 0,
};

const PostPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const [showCommentBox, setShowCommentBox] = useState(null);
    const user = useSelector((state) => state.user.userData);
    const post = useSelector((state) => state.post.post);

    useEffect(() => {
      dispatch(getPost(id));
    }, [dispatch, id]);

  return (
    <div className="min-h-screen mx-3 md:mx-0 flex flex-col justify-center items-center">
      <div className="flex flex-col gap-4 w-[700px] mt-[130px]">
        <div className="bg-secondary mb-[30px] flex flex-col items-center gap-3 rounded-2xl shadow-hard">
          <div className="w-full flex justify-between px-5 bg-primary py-2 rounded-t-2xl">
            <h5 className="text-white font-route text-[24px] font-bold">
              Discussion
            </h5>
            <NavLink to="/discuss" onClick={() => handleTabTitle("Discuss")}>
              <h5 className="text-white underline w-max flex gap-[2px] cursor-pointer items-center font-route text-[21px] font-bold">
                Back
              </h5>
            </NavLink>
          </div>
          <div className="w-full flex flex-col gap-1 pb-3">
            <div className="flex flex-col mx-5 my-2 gap-2 pt-4 pb-4 px-6 border-2 border-bprimary rounded-2xl">
              <div className="flex flex-col px-1 gap-7">
                <div className="flex flex-col gap-3">
                  <h2 className="text-4xl text-white font-route">
                    {post?.title}
                  </h2>
                  <p className="font-route text-[21px] mt-[-17px] tracking-w_ide text-textsecond">
                    Posted by{" "}
                    <span
                      className="text-white underline cursor-pointer"
                      onClick={() =>
                        navigate(`/profile/${post?.author?.username}`)
                      }
                    >
                      {post?.author?.username}
                    </span>{" "}
                    {getRelativeTime(post?.createdAt)}
                  </p>
                </div>
                <p className="font-main text-[16px] text-white leading-7">
                  {post?.content}
                </p>
              </div>
              <div className="mt-16">
                <CommentReplyBox />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 w-[700px]">
        <div className="bg-secondary mb-[50px] flex flex-col items-center gap-3 rounded-2xl shadow-hard">
          <div className="w-full flex justify-between px-5 bg-primary py-2 rounded-t-2xl">
            <h5 className="text-white font-route text-[24px] font-bold">
              {post?.commentCount} Comments
            </h5>
          </div>
          <div className="w-full flex flex-col gap-1 pb-3">
            <div className="flex flex-col gap-4 pt-4 pb-4 px-6  rounded-2xl">
              {post?.comments?.length > 0 &&
                post?.comments.map((comment, index) => <CommentBox index={index} comment={comment} showCommentBox={showCommentBox} setShowCommentBox={setShowCommentBox} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostPage
