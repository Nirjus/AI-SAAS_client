import React, { FC } from 'react'

interface HeadProps{
    title: string;
    description: string;
    keyword: string;
}

const Heading:FC<HeadProps> = ({title,description, keyword}) => {
  return (
    <>
    <title>{title}</title>
    <meta name="viewport" content='width=device-width, initial-scale=1' />
    <meta name="description" content={description}/>
    <meta name='keywords' content={keyword}/>
    </>
  )
}

export default Heading