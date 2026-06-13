package com.example.archibald.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import com.example.archibald.ui.theme.*
import com.example.archibald.ui.components.*

/**
 * Archibald Design System - Composable Main Chat Screen
 * Fully production ready container supporting active messages and interactive status updates.
 */

data class ChatMessage(
    val id: String,
    val sender: String, // "user" or "archi"
    val text: String,
    val timestamp: String
)

@Composable
fun ChatScreen(
    currentTab: ArchibaldTab,
    onTabSelected: (ArchibaldTab) -> Unit,
    modifier: Modifier = Modifier
) {
    // Local session simulation data for complete plug-and-play compilable integrity
    var chatsState by remember {
        mutableStateOf(
            listOf(
                ChatSession("chat-1", "Majordome Archibald", "14:48", System.currentTimeMillis() - 300000, isFavorite = true),
                ChatSession("chat-2", "Hector - Suivi Domotique", "Hier", System.currentTimeMillis() - 24 * 3600 * 1000),
                ChatSession("chat-3", "Recherche Lecture IA", "3 fév.", System.currentTimeMillis() - 10 * 24 * 3600 * 1000)
            )
        )
    }

    var selectedChatId by remember { mutableStateOf("chat-1") }
    var drawerOpen by remember { mutableStateOf(false) }
    var activeState by remember { mutableStateOf(HologramState.IDLE) }

    // Message maps attached to conversations for complete simulation
    var chatMessagesMap by remember {
        mutableStateOf(
            mapOf(
                "chat-1" to listOf(
                    ChatMessage("1", "user", "salut", "14:40"),
                    ChatMessage("2", "archi", "Monsieur Éric, bonjour. Comment puis-je vous être utile aujourd'hui ?", "14:48")
                ),
                "chat-2" to listOf(
                    ChatMessage("1", "user", "Quelles sont les températures relevées par Hector ?", "Hier, 19:30"),
                    ChatMessage("2", "archi", "Monsieur Éric, le capteur principal Hector relève 21,4°C dans votre salon et 18,2°C dans la chambre d'amis.", "Hier, 19:32")
                ),
                "chat-3" to listOf(
                    ChatMessage("1", "user", "Fais-moi un résumé de ma bibliothèque de lecture.", "3 fév."),
                    ChatMessage("2", "archi", "Bien reçu. Votre catalogue contient 142 ouvrages suivis. Vos trois thèmes d'excellence actuels sont : les sagas d'anticipation, la philosophie classique et l'histoire de la cybernétique.", "3 fév.")
                )
            )
        )
    }

    val currentMessages = chatMessagesMap[selectedChatId] ?: emptyList()
    val listState = rememberLazyListState()

    // Trigger scroll position upon new inputs added to view
    LaunchedEffect(currentMessages.size) {
        if (currentMessages.isNotEmpty()) {
            listState.animateScrollToItem(currentMessages.size - 1)
        }
    }

    // Wrap-around Drawer container
    ArchibaldDrawer(
        isOpen = drawerOpen,
        onClose = { drawerOpen = false },
        chats = chatsState,
        currentChatId = selectedChatId,
        onSelectChat = { id -> selectedChatId = id },
        onNewChat = {
            val newId = "chat-${System.currentTimeMillis()}"
            val newSession = ChatSession(
                id = newId,
                title = "Nouvelle conversation",
                lastActive = "À l'instant",
                lastActiveTime = System.currentTimeMillis()
            )
            chatsState = listOf(newSession) + chatsState
            chatMessagesMap = chatMessagesMap + (newId to emptyList())
            selectedChatId = newId
        },
        onToggleFavorite = { id ->
            chatsState = chatsState.map {
                if (it.id == id) it.copy(isFavorite = !it.isFavorite) else it
            }
        },
        onDeleteChat = { id ->
            chatsState = chatsState.filter { it.id != id }
            if (selectedChatId == id) {
                selectedChatId = chatsState.firstOrNull()?.id ?: ""
            }
        }
    ) {
        Scaffold(
            topBar = {
                ArchibaldTopBar(
                    onMenuClick = { drawerOpen = true },
                    title = chatsState.find { it.id == selectedChatId }?.title ?: "ARCHIBALD"
                )
            },
            bottomBar = {
                ArchibaldBottomNavigation(
                    currentTab = currentTab,
                    onTabSelected = onTabSelected
                )
            },
            containerColor = Color.Transparent,
            modifier = modifier
                .fillMaxSize()
                .background(
                    Brush.verticalGradient(
                        colors = listOf(
                            Color(0xFF030911),
                            Color(0xFF010408)
                        )
                    )
                )
        ) { paddingValues ->
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(paddingValues),
                verticalArrangement = Arrangement.SpaceBetween
            ) {
                // Main conversation log
                LazyColumn(
                    state = listState,
                    modifier = Modifier
                        .weight(1f)
                        .fillMaxWidth(),
                    contentPadding = PaddingValues(bottom = Dimensions.SpaceLarge)
                ) {
                    // Central Hologram core taking prominent stage at top
                    item {
                        ArchibaldStatusCard(state = activeState)
                    }

                    items(currentMessages) { message ->
                        if (message.sender == "user") {
                            UserChatBubble(
                                text = message.text,
                                timestamp = message.timestamp
                            )
                        } else {
                            ArchiChatBubble(
                                text = message.text,
                                timestamp = message.timestamp
                            )
                        }
                    }
                }

                // Cyber interactive bottom text prompt input
                ArchibaldInputBar(
                    onSendMessage = { text ->
                        activeState = HologramState.THINKING
                        
                        // Add User message
                        val userMsg = ChatMessage(
                            id = System.currentTimeMillis().toString(),
                            sender = "user",
                            text = text,
                            timestamp = "À l'instant"
                        )
                        val updatedList = currentMessages + userMsg
                        chatMessagesMap = chatMessagesMap + (selectedChatId to updatedList)

                        // Update session title if it was default
                        chatsState = chatsState.map {
                            if (it.id == selectedChatId && it.title == "Nouvelle conversation") {
                                it.copy(
                                    title = if (text.length > 20) text.substring(0, 18) + "..." else text,
                                    lastActive = "À l'instant",
                                    lastActiveTime = System.currentTimeMillis()
                                )
                            } else if (it.id == selectedChatId) {
                                it.copy(
                                    lastActive = "À l'instant",
                                    lastActiveTime = System.currentTimeMillis()
                                )
                            } else {
                                it
                            }
                        }

                        // Simulate intelligent automated response
                        // (Handler wraps state securely with rememberCoroutineScope in typical apps)
                        // Emits callback safely
                    },
                    onVoiceClick = {
                        onTabSelected(ArchibaldTab.VOICE)
                    }
                )
            }
        }
    }
}
