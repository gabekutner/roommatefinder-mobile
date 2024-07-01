import React, { useState, useEffect } from "react";

import MessageBubbleMe from "./MessageBubbleMe";
import MessageBubbleFriend from "./MessageBubbleFriend";
import useGlobal from "../../../core/global";


export default function MessageBubble({ 
	index, 
	message, 
	friend, 
	colors 
}) {
  const messagesTyping = useGlobal(state => state.messagesTyping)
	const [showTyping, setShowTyping] = useState(false)

	useEffect(() => {
		if (index !== 0) return
		if (messagesTyping === null) {
			setShowTyping(false)
			return
		}
		setShowTyping(true)
		const check = setInterval(() => {
			const now = new Date()
			const ms = now - messagesTyping
			if (ms > 10000) {
				setShowTyping(false)
			}
		}, 1000)
		return () => clearInterval(check)
	}, [messagesTyping])

	if (index === 0) {
		if (showTyping) {
			return <MessageBubbleFriend friend={friend} typing={true} colors={colors} />
		}
		return
	}

	return message.is_me ? (
		<MessageBubbleMe text={message.text} colors={colors} />
	) : (
		<MessageBubbleFriend text={message.text} friend={friend} colors={colors} />
	)
}