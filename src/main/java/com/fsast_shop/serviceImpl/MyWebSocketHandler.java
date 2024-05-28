package com.fsast_shop.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Component
public class MyWebSocketHandler extends TextWebSocketHandler {

	private final SimpMessagingTemplate messagingTemplate;

	@Autowired
	public MyWebSocketHandler(SimpMessagingTemplate messagingTemplate) {
		this.messagingTemplate = messagingTemplate;
	}

	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		// Handle incoming messages
		// You can process the message and send a response if needed
	}

	public void sendMessageToUser(String username, String destination, Object payload) {
		messagingTemplate.convertAndSendToUser(username, destination, payload);
	}

}
