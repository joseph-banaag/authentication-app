"use client"
import React from 'react'
import { Link } from "@nextui-org/react"

export default function Footer(): React.JSX.Element | null {
    return (
        <div className="footerContainer">
            <h1 className="footerMessage">This is not an actual sign in page of the company. The logo and name are just placeholders for UI purposes only.</h1>
            <p className="footerMessage">For the illustration, I am using the online illustration by <Link href="https://storyset.com/online" className="footerIllustrationProvider">Storyset</Link></p>
        </div>
    )
}