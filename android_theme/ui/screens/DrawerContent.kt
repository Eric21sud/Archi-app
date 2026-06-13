package com.example.archibald.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.text.BasicTextField
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material.icons.outlined.StarBorder
import androidx.compose.material3.Divider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.archibald.ui.theme.*

/**
 * Archibald Design System - DrawerContent Screen Module
 * Built precisely to mimic the high fidelity ChatGPT sidebar experience.
 */

data class ChatSession(
    val id: String,
    val title: String,
    val lastActive: String,
    val lastActiveTime: Long,
    val isFavorite: Boolean = false
)

data class DrawerProject(
    val id: String,
    val name: String,
    val iconType: String,
    val activity: String
)

@Composable
fun DrawerContent(
    chats: List<ChatSession>,
    currentChatId: String,
    onSelectChat: (String) -> Unit,
    onNewChat: () -> Unit,
    onToggleFavorite: (String) -> Unit,
    onDeleteChat: (String) -> Unit,
    onClose: () -> Unit,
    modifier: Modifier = Modifier
) {
    var searchQuery by remember { mutableStateOf("") }

    val projects = remember {
        listOf(
            DrawerProject("hector", "Hector Domotique", "hector", "Il y a 2h"),
            DrawerProject("archibald", "Majordome Archibald", "archibald", "Actif"),
            DrawerProject("lecture", "Application Lecture", "lecture", "Hier"),
            DrawerProject("ve", "Comparateur VE", "ve", "3 fév.")
        )
    }

    // Filtered chats based on search query
    val filteredChats = chats.filter {
        searchQuery.isEmpty() || it.title.contains(searchQuery, ignoreCase = true)
    }

    // Split list between favorites and remaining subjects sorted by recency
    val favorites = filteredChats.filter { it.isFavorite }.sortedByDescending { it.lastActiveTime }
    val standards = filteredChats.filter { !it.isFavorite }.sortedByDescending { it.lastActiveTime }

    Column(
        modifier = modifier
            .fillMaxSize()
            .background(Color(0xFF040C16))
            .border(width = Dimensions.BorderMicro, color = CyanGlow.copy(alpha = 0.2f))
    ) {
        // ---- Sidebar Header ----
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(Dimensions.SpaceLarge)
                .padding(top = Dimensions.SpaceSmall),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column {
                Text(
                    text = "ARCHIBALD",
                    fontFamily = FontFamily.SansSerif,
                    fontWeight = FontWeight.Bold,
                    fontSize = 15.sp,
                    letterSpacing = 2.sp,
                    color = CyanGlow
                )
                Text(
                    text = "PANNEAU DE CONTRÔLE",
                    fontFamily = FontFamily.Monospace,
                    fontWeight = FontWeight.SemiBold,
                    fontSize = 8.sp,
                    letterSpacing = 1.sp,
                    color = WhiteDim.copy(alpha = 0.55f)
                )
            }

            IconButton(
                onClick = onClose,
                modifier = Modifier
                    .size(32.dp)
                    .background(Color.White.copy(alpha = 0.05f), CircleShape)
                    .border(Dimensions.BorderMicro, Color.White.copy(alpha = 0.1f), CircleShape)
            ) {
                Icon(
                    imageVector = Icons.Default.Close,
                    contentDescription = "Fermer",
                    tint = Color.White.copy(alpha = 0.7f),
                    modifier = Modifier.size(15.dp)
                )
            }
        }

        // Lazy Scroll Core Container
        LazyColumn(
            modifier = Modifier
                .weight(1f)
                .fillMaxWidth()
                .padding(horizontal = Dimensions.SpaceLarge),
            verticalArrangement = Arrangement.spacedBy(Dimensions.SpaceLarge)
        ) {
            // ---- Action Item: New Conversation Button ----
            item {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .background(CyanGlow.copy(alpha = 0.1f), CreativeShapes.ProjectCardShape)
                        .border(
                            width = Dimensions.BorderMicro,
                            color = CyanGlow.copy(alpha = 0.35f),
                            shape = CreativeShapes.ProjectCardShape
                        )
                        .clickable { onNewChat() }
                        .padding(v = Dimensions.SpaceMedium, h = Dimensions.SpaceMedium),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.Center
                ) {
                    Icon(
                        imageVector = Icons.Default.PlusOne, // representative plus
                        contentDescription = "New Discussion",
                        tint = CyanGlow,
                        modifier = Modifier.size(18.dp)
                    )
                    Spacer(modifier = Modifier.width(Dimensions.SpaceSmall))
                    Text(
                        text = "Nouvelle conversation",
                        color = Color.White,
                        fontFamily = FontFamily.SansSerif,
                        fontWeight = FontWeight.Medium,
                        fontSize = 13.sp
                    )
                }
            }

            // ---- Live Searching Input Panel ----
            item {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .background(Color(0xFF081524).copy(alpha = 0.6f), CreativeShapes.PillShape)
                        .border(
                            width = Dimensions.BorderMicro,
                            color = Color.White.copy(alpha = 0.1f),
                            shape = CreativeShapes.PillShape
                        )
                        .padding(v = Dimensions.SpaceSmall, h = Dimensions.SpaceMedium),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(
                        imageVector = Icons.Default.Search,
                        contentDescription = "Search",
                        tint = Color.White.copy(alpha = 0.3f),
                        modifier = Modifier.size(16.dp)
                    )
                    Spacer(modifier = Modifier.width(Dimensions.SpaceSmall))
                    BasicTextField(
                        value = searchQuery,
                        onValueChange = { searchQuery = it },
                        textStyle = LabelStyle.copy(color = Color.White),
                        singleLine = true,
                        modifier = Modifier.weight(1f),
                        decorationBox = { innerTextField ->
                            if (searchQuery.isEmpty()) {
                                Text(
                                    text = "Rechercher...",
                                    style = LabelStyle.copy(color = Color.White.copy(alpha = 0.3f))
                                )
                            }
                            innerTextField()
                        }
                    )
                    if (searchQuery.isNotEmpty()) {
                        Icon(
                            imageVector = Icons.Default.Clear,
                            contentDescription = "Clear",
                            tint = Color.White.copy(alpha = 0.5f),
                            modifier = Modifier
                                .size(14.dp)
                                .clickable { searchQuery = "" }
                        )
                    }
                }
            }

            // ---- Conversations List Title Grid ----
            item {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = "CONVERSATIONS",
                        fontFamily = FontFamily.Monospace,
                        fontWeight = FontWeight.Bold,
                        fontSize = 10.sp,
                        letterSpacing = 1.5.sp,
                        color = Color.White.copy(alpha = 0.4f)
                    )
                    Box(
                        modifier = Modifier
                            .background(CyanGlow.copy(alpha = 0.1f), CircleShape)
                            .border(Dimensions.BorderMicro, CyanGlow.copy(alpha = 0.2f), CircleShape)
                            .padding(v = 2.dp, h = 6.dp)
                    ) {
                        Text(
                            text = "${filteredChats.size}",
                            color = CyanGlow,
                            fontFamily = FontFamily.Monospace,
                            fontWeight = FontWeight.Bold,
                            fontSize = 9.sp
                        )
                    }
                }
            }

            // Empty state illustration
            if (filteredChats.isEmpty()) {
                item {
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(vertical = Dimensions.SpaceLarge),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(
                            text = "Aucun résultat",
                            style = LabelStyle.copy(color = Color.White.copy(alpha = 0.3f))
                        )
                    }
                }
            }

            // ---- Render Favorites first ----
            items(favorites) { chat ->
                DrawerChatItem(
                    chat = chat,
                    isActive = chat.id == currentChatId,
                    onSelect = onSelectChat,
                    onToggleFavorite = onToggleFavorite,
                    onDelete = onDeleteChat
                )
            }

            // Optional Divider
            if (favorites.isNotEmpty() && standards.isNotEmpty()) {
                item {
                    Spacer(modifier = Modifier.height(2.dp))
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(0.5.dp)
                            .background(Color.White.copy(alpha = 0.08f))
                    )
                }
            }

            // ---- Render Standards remaining ----
            items(standards) { chat ->
                DrawerChatItem(
                    chat = chat,
                    isActive = chat.id == currentChatId,
                    onSelect = onSelectChat,
                    onToggleFavorite = onToggleFavorite,
                    onDelete = onDeleteChat
                )
            }

            // ---- Archibald Custom Managed Client Workscapes ----
            item {
                Spacer(modifier = Modifier.height(Dimensions.SpaceMedium))
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    modifier = Modifier.padding(bottom = Dimensions.SpaceSmall)
                ) {
                    Icon(
                        imageVector = Icons.Default.CompassCalibration,
                        contentDescription = "Compass",
                        tint = CyanGlow,
                        modifier = Modifier.size(14.dp)
                    )
                    Spacer(modifier = Modifier.width(Dimensions.SpaceSmall))
                    Text(
                        text = "PROJETS ARCHIBALD",
                        fontFamily = FontFamily.Monospace,
                        fontWeight = FontWeight.Bold,
                        fontSize = 10.sp,
                        letterSpacing = 1.5.sp,
                        color = Color.White.copy(alpha = 0.4f)
                    )
                }
            }

            // Render projects
            items(projects) { project ->
                val designColor = when (project.iconType) {
                    "hector" -> Color(0xFF34D399)
                    "archibald" -> CyanGlow
                    "lecture" -> Color(0xFFC084FC)
                    "ve" -> Color(0xFFFBBF24)
                    else -> WhiteDim
                }
                
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .background(Color(0xFF071321).copy(alpha = 0.4f), CreativeShapes.ProjectCardShape)
                        .border(
                            width = Dimensions.BorderMicro,
                            color = Color.White.copy(alpha = 0.05f),
                            shape = CreativeShapes.ProjectCardShape
                        )
                        .clickable { /* Handle project workspace load */ }
                        .padding(v = Dimensions.SpaceSmall, h = Dimensions.SpaceMedium),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Box(
                            modifier = Modifier
                                .size(30.dp)
                                .background(Color.White.copy(alpha = 0.03f), CreativeShapes.ProjectCardShape)
                                .border(Dimensions.BorderMicro, Color.White.copy(alpha = 0.1f), CreativeShapes.ProjectCardShape),
                            contentAlignment = Alignment.Center
                        ) {
                            Box(
                                modifier = Modifier
                                    .size(6.dp)
                                    .background(designColor, CircleShape)
                            )
                        }
                        Spacer(modifier = Modifier.width(Dimensions.SpaceMedium))
                        Column {
                            Text(
                                text = project.name,
                                style = ProjectTitleStyle.copy(fontSize = 11.sp)
                            )
                            Text(
                                text = "Actif : ${project.activity}",
                                style = ProjectActivityStyle.copy(fontSize = 8.sp)
                            )
                        }
                    }
                    
                    Box(
                        modifier = Modifier
                            .size(5.dp)
                            .background(CyanGlow.copy(alpha = 0.6f), CircleShape)
                    )
                }
            }
        }

        // ---- Bottom Core Version / User Profile Footrail ----
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .background(Color(0xFF030911).copy(alpha = 0.5f))
                .border(width = Dimensions.BorderMicro, color = Color.White.copy(alpha = 0.05f))
                .padding(Dimensions.SpaceLarge),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Box(
                    modifier = Modifier
                        .size(6.dp)
                        .background(Color(0xFF34D399), CircleShape)
                )
                Spacer(modifier = Modifier.width(Dimensions.SpaceSmall))
                Text(
                    text = "ARCHI-NOYAU V4.1",
                    fontFamily = FontFamily.Monospace,
                    fontWeight = FontWeight.Bold,
                    fontSize = 9.sp,
                    color = Color.White.copy(alpha = 0.4f)
                )
            }
            Text(
                text = "Eric v.p.",
                fontFamily = FontFamily.Monospace,
                fontWeight = FontWeight.SemiBold,
                fontSize = 9.sp,
                color = CyanGlow
            )
        }
    }
}

@Composable
fun DrawerChatItem(
    chat: ChatSession,
    isActive: Boolean,
    onSelect: (String) -> Unit,
    onToggleFavorite: (String) -> Unit,
    onDelete: (String) -> Unit
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .background(
                color = if (isActive) CyanGlow.copy(alpha = 0.08f) else Color.Transparent,
                shape = CreativeShapes.ProjectCardShape
            )
            .border(
                width = Dimensions.BorderMicro,
                color = if (isActive) CyanGlow.copy(alpha = 0.3f) else Color.Transparent,
                shape = CreativeShapes.ProjectCardShape
            )
            .clickable { onSelect(chat.id) }
            .padding(v = Dimensions.SpaceSmall, h = Dimensions.SpaceSmall),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        Row(
            verticalAlignment = Alignment.CenterVertically,
            modifier = Modifier.weight(1f)
        ) {
            Icon(
                imageVector = if (chat.isFavorite) Icons.Default.Star else Icons.Default.Message,
                contentDescription = "Icon",
                tint = if (chat.isFavorite) Color(0xFFFBBF24) else Color.White.copy(alpha = 0.3f),
                modifier = Modifier.size(16.dp)
            )
            Spacer(modifier = Modifier.width(Dimensions.SpaceSmall))
            Column {
                Text(
                    text = chat.title,
                    color = if (isActive) CyanGlow else Color.White.copy(alpha = 0.85f),
                    fontFamily = FontFamily.SansSerif,
                    fontWeight = FontWeight.Medium,
                    fontSize = 11.sp,
                    maxLines = 1
                )
                Spacer(modifier = Modifier.height(1.dp))
                Text(
                    text = chat.lastActive,
                    fontFamily = FontFamily.Monospace,
                    fontWeight = FontWeight.Normal,
                    fontSize = 8.sp,
                    color = Color.White.copy(alpha = 0.35f)
                )
            }
        }

        // Action Trigger Row
        Row(verticalAlignment = Alignment.CenterVertically) {
            IconButton(
                onClick = { onToggleFavorite(chat.id) },
                modifier = Modifier.size(24.dp)
            ) {
                Icon(
                    imageVector = if (chat.isFavorite) Icons.Default.Star else Icons.Outlined.StarBorder,
                    contentDescription = "Favorite",
                    tint = if (chat.isFavorite) Color(0xFFFBBF24) else Color.White.copy(alpha = 0.3f),
                    modifier = Modifier.size(14.dp)
                )
            }
            IconButton(
                onClick = { onDelete(chat.id) },
                modifier = Modifier.size(24.dp)
            ) {
                Icon(
                    imageVector = Icons.Default.Delete,
                    contentDescription = "Delete",
                    tint = Color.White.copy(alpha = 0.3f),
                    modifier = Modifier.size(14.dp)
                )
            }
        }
    }
}
