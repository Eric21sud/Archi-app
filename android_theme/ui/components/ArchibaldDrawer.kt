package com.example.archibald.ui.components

import androidx.compose.animation.*
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import com.example.archibald.ui.theme.CosmicDark
import com.example.archibald.ui.screens.DrawerContent

/**
 * Archibald Design System - Composable Sliding Drawer
 * Handles ChatGPT-like smooth lateral animation and translucent background overlay blur simulation.
 */

@Composable
fun ArchibaldDrawer(
    isOpen: Boolean,
    onClose: () -> Unit,
    chats: List<com.example.archibald.ui.screens.ChatSession>,
    currentChatId: String,
    onSelectChat: (String) -> Unit,
    onNewChat: () -> Unit,
    onToggleFavorite: (String) -> Unit,
    onDeleteChat: (String) -> Unit,
    modifier: Modifier = Modifier,
    content: @Composable () -> Unit
) {
    Box(modifier = modifier.fillMaxSize()) {
        // Main Screen Content Container
        content()

        // Backdrop tint with animated transition
        AnimatedVisibility(
            visible = isOpen,
            enter = fadeIn(animationSpec = tween(250)),
            exit = fadeOut(animationSpec = tween(250))
        ) {
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .background(Color.Black.copy(alpha = 0.55f))
                    .clickable { onClose() }
            )
        }

        // ChatGPT-Inspired Sliding Drawer Panel
        AnimatedVisibility(
            visible = isOpen,
            enter = slideInHorizontally(
                initialOffsetX = { -it },
                animationSpec = tween(durationMillis = 280)
            ),
            exit = slideOutHorizontally(
                targetOffsetX = { -it },
                animationSpec = tween(durationMillis = 280)
            )
        ) {
            Box(
                modifier = Modifier
                    .fillMaxHeight()
                    .width(Dimensions.SidebarWidth)
                    .background(Color(0xFF040C16).copy(alpha = 0.96f))
            ) {
                DrawerContent(
                    chats = chats,
                    currentChatId = currentChatId,
                    onSelectChat = { id ->
                        onSelectChat(id)
                        onClose()
                    },
                    onNewChat = {
                        onNewChat()
                        onClose()
                    },
                    onToggleFavorite = onToggleFavorite,
                    onDeleteChat = onDeleteChat,
                    onClose = onClose
                )
            }
        }
    }
}
