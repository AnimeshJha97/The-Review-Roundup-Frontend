'use client'

import React, { useState, useEffect } from 'react'

const LongBanner = ({ type }: { type: string }) => {
    const [imgUrl, setImgUrl] = useState('')

    const urls = {
        movieUrl: 'https://res.cloudinary.com/animesh-jha/image/upload/v1687551334/TheRoundReview/movies/joker-movie-8k-banner_a2ttbWqUmZqaraWkpJRsa21lrWdobWw-2434391101_a1cwvn.jpg',
        tvSeriesUrl: 'https://res.cloudinary.com/animesh-jha/image/upload/v1687551334/TheRoundReview/movies/joker-movie-8k-banner_a2ttbWqUmZqaraWkpJRsa21lrWdobWw-2434391101_a1cwvn.jpg',
        destinationsUrl: 'https://res.cloudinary.com/animesh-jha/image/upload/v1687551334/TheRoundReview/movies/joker-movie-8k-banner_a2ttbWqUmZqaraWkpJRsa21lrWdobWw-2434391101_a1cwvn.jpg',
        gamesUrl: 'https://res.cloudinary.com/animesh-jha/image/upload/v1687551334/TheRoundReview/movies/joker-movie-8k-banner_a2ttbWqUmZqaraWkpJRsa21lrWdobWw-2434391101_a1cwvn.jpg',
        dstinationUrl: 'https://res.cloudinary.com/animesh-jha/image/upload/v1687551334/TheRoundReview/movies/joker-movie-8k-banner_a2ttbWqUmZqaraWkpJRsa21lrWdobWw-2434391101_a1cwvn.jpg',
        booksUrl: 'https://res.cloudinary.com/animesh-jha/image/upload/v1687551334/TheRoundReview/movies/joker-movie-8k-banner_a2ttbWqUmZqaraWkpJRsa21lrWdobWw-2434391101_a1cwvn.jpg',
    }

    // 'Games', 'Live Shows', 'Books'

    useEffect(() => {
        switch (type) {
            case 'Movies': {
                setImgUrl(urls.movieUrl);
                break
            }
            case 'Tv Series': {
                setImgUrl(urls.tvSeriesUrl)
                break
            }
            case 'Destinations': {
                setImgUrl(urls.destinationsUrl)
                break
            }
            case 'Games': {
                setImgUrl(urls.gamesUrl)
                break
            }
            case 'Live Shows': {
                setImgUrl(urls.booksUrl)
                break
            }
            case 'Books': {
                setImgUrl(urls.booksUrl)
                break
            }
        }
    }, [type])


    return (
        <div style={{ backgroundImage: `url(${imgUrl})` }} className={`w-full mt-[64px] mb-[64px] h-[300px] overflow-hidden bg-cover bg-[center_top_-3rem]`} />
    )
}

export default LongBanner