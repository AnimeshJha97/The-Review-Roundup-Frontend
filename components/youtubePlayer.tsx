import React from 'react';
import YouTube from 'react-youtube';

const YoutubePlayer = ({ videoId }: { videoId: string }) => {
    const opts = {
        height: '400px',
        width: '98%',
        playerVars: {
            autoplay: 0,
            rel: 0, // Disable related videos
        },
    };

    return <YouTube videoId={videoId} opts={opts} />;
};

export default YoutubePlayer;