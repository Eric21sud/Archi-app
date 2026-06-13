package com.example.archibald.ui.screens

import androidx.compose.animation.core.*
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.BasicTextField
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.blur
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.drawWithContent
import androidx.compose.ui.draw.rotate
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.ColorFilter
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.TextFieldValue
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.archibald.ui.theme.*

// Simple data model for illustration
data class Message(val id: String, val text: String, val timestamp: String, val isUser: Boolean)

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ArchibaldChatScreen() {
    val messages = remember {
        mutableStateListOf(
            Message("1", "salut", "14:40", isUser = true),
            Message("2", "Monsieur Éric, bonjour. Comment puis-je vous être utile aujourd'hui ?", "14:48", isUser = false)
        )
    }
    var inputText by remember { mutableStateOf(TextFieldValue("")) }
    val listState = rememberLazyListState()

    // Scroll tracker to fade out our central hologram as soon as user scrolls down
    val showHologram = remember {
        derivedStateOf {
            listState.firstVisibleItemIndex == 0 && listState.firstVisibleItemScrollOffset < 300
        }
    }
    
    // Smooth opacity transition for the hologram based on scroll position
    val hologramAlpha by animateFloatAsState(
        targetValue = if (showHologram.value) 1f else 0f,
        animationSpec = tween(durationMillis = 300)
    )

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(CosmicDark)
    ) {
        // 1. Ambient Background Glowing Orbs
        BackgroundDeepGlows()

        Column(
            modifier = Modifier
                .fillMaxSize()
                .navigationBarsPadding()
                .statusBarsPadding()
        ) {
            // 2. Compact Slim Header
            HeaderBar()

            // 3. Main Message Area
            Box(
                modifier = Modifier
                    .weight(1f)
                    .fillMaxWidth()
            ) {
                LazyColumn(
                    state = listState,
                    modifier = Modifier.fillMaxSize(),
                    contentPadding = PaddingValues(bottom = 16.dp, top = 8.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    // Hologram is displayed at the absolute top of the list
                    item {
                        if (hologramAlpha > 0.05f) {
                            Box(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .blur(if (hologramAlpha < 0.9f) 10.dp else 0.dp)
                                    .drawWithContent {
                                        drawContent()
                                    }
                            ) {
                                CentralHologram(status = "idle", alpha = hologramAlpha)
                            }
                        } else {
                            // Extra padding when hologram disappears to keep dynamic layout comfort
                            Spacer(modifier = Modifier.height(16.dp))
                        }
                    }

                    items(messages, key = { it.id }) { message ->
                        if (message.isUser) {
                            UserChatBubble(message = message)
                        } else {
                            ArchiChatBubble(message = message)
                        }
                    }
                }
            }

            // 4. Futuristic Input Bar with glowing send button
            InputArea(
                textValue = inputText,
                onValueChange = { inputText = it },
                onSend = {
                    if (inputText.text.isNotBlank()) {
                        messages.add(Message(System.currentTimeMillis().toString(), inputText.text, "14:50", isUser = true))
                        inputText = TextFieldValue("")
                    }
                }
            )

            // 5. High-Contrast Premium Bottom Navigation
            BottomNavigationBar()
        }
    }
}

@Composable
fun BackgroundDeepGlows() {
    Canvas(modifier = Modifier.fillMaxSize()) {
        val width = size.width
        val height = size.height

        // Top-center cyan radial glow
        drawCircle(
            brush = Brush.radialGradient(
                colors = listOf(CyanGlow.copy(alpha = 0.15f), Color.Transparent),
                center = Offset(width / 2, height * 0.1f),
                radius = width * 0.7f
            )
        )

        // Subtle center-left cyan particle glow
        drawCircle(
            brush = Brush.radialGradient(
                colors = listOf(BlueGlow.copy(alpha = 0.08f), Color.Transparent),
                center = Offset(width * 0.1f, height * 0.5f),
                radius = width * 0.4f
            )
        )
    }
}

@Composable
fun HeaderBar() {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .height(56.dp)
            .padding(horizontal = 16.dp),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
    ) {
        // Round Menu Action
        IconButton(
            onClick = {},
            modifier = Modifier
                .size(36.dp)
                .background(Color.White.copy(alpha = 0.05f), CircleShape)
                .border(1.dp, Color.White.copy(alpha = 0.1f), CircleShape)
        ) {
            Icon(
                imageVector = Icons.Default.Menu,
                contentDescription = "Menu",
                tint = Color.White.copy(alpha = 0.7f),
                modifier = Modifier.size(18.dp)
            )
        }

        // Title and Subtitle Block
        Column(horizontalAlignment = Alignment.CenterHorizontally) {
            Text(
                text = "ARCHI",
                style = HeaderTitleStyle.copy(
                    fontSize = 22.sp,
                    shadow = androidx.compose.ui.graphics.Shadow(
                        color = CyanGlow.copy(alpha = 0.5f),
                        blurRadius = 12f
                    )
                )
            )
            Text(
                text = "MAJORDOME IA",
                style = HeaderSubtitleStyle.copy(fontSize = 7.5.sp)
            )
        }

        // Dropdown Toggle
        IconButton(
            onClick = {},
            modifier = Modifier
                .size(36.dp)
                .background(Color.White.copy(alpha = 0.05f), CircleShape)
                .border(1.dp, Color.White.copy(alpha = 0.1f), CircleShape)
        ) {
            Icon(
                imageVector = Icons.Default.KeyboardArrowDown,
                contentDescription = "Collapse",
                tint = Color.White.copy(alpha = 0.7f),
                modifier = Modifier.size(20.dp)
            )
        }
    }
}

@Composable
fun CentralHologram(status: String, alpha: Float) {
    val infiniteTransition = rememberInfiniteTransition(label = "hologram")
    
    // Slow rotating outer dashed ring
    val slowRotation by infiniteTransition.animateFloat(
        initialValue = 0f,
        targetValue = 360f,
        animationSpec = infiniteRepeatable(
            animation = tween(12000, easing = LinearEasing),
            repeatMode = RepeatMode.Restart
        ),
        label = "slowRotation"
    )

    // Breathing scale for core avatar
    val breathingScale by infiniteTransition.animateFloat(
        initialValue = 0.96f,
        targetValue = 1.02f,
        animationSpec = infiniteRepeatable(
            animation = tween(2200, easing = FastOutSlowInEasing),
            repeatMode = RepeatMode.Reverse
        ),
        label = "breathingScale"
    )

    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 12.dp)
            .blur(0.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Box(
            modifier = Modifier
                .size(130.dp),
            contentAlignment = Alignment.Center
        ) {
            // Rotating Outer Dashed Laser ring
            Canvas(modifier = Modifier.fillMaxSize().rotate(slowRotation)) {
                drawCircle(
                    color = CyanGlow.copy(alpha = 0.25f * alpha),
                    style = Stroke(
                        width = 1.dp.toPx(),
                        pathEffect = androidx.compose.ui.graphics.PathEffect.dashPathEffect(
                            floatArrayOf(15f, 15f), 0f
                        )
                    )
                )
            }

            // Glowing glass inner chamber
            Box(
                modifier = Modifier
                    .size(96.dp)
                    .clip(CircleShape)
                    .background(
                        Brush.verticalGradient(
                            colors = listOf(
                                Color(0x3314233C),
                                Color(0xE6050F1D)
                            )
                        )
                    )
                    .border(1.dp, CyanGlow.copy(alpha = 0.4f * alpha), CircleShape),
                contentAlignment = Alignment.Center
            ) {
                // Interactive core hologram image (Archi avatar)
                Image(
                    painter = painterResource(id = android.R.drawable.stat_sys_phone_call), // Replace with your real archibald_avatar asset drawable!
                    contentDescription = "Avatar Core",
                    modifier = Modifier
                        .fillMaxSize(0.9f)
                        .clip(CircleShape)
                        .blur(0.dp)
                        .rotate(0f),
                    contentScale = ContentScale.Crop,
                    colorFilter = ColorFilter.lighting(multiply = Color.White, add = CyanGlow.copy(alpha = 0.2f))
                )

                // Holographic circular glare sweep
                Canvas(modifier = Modifier.fillMaxSize()) {
                    drawCircle(
                        brush = Brush.radialGradient(
                            colors = listOf(Color.White.copy(alpha = 0.15f * alpha), Color.Transparent),
                            center = Offset(size.width * 0.3f, size.height * 0.3f),
                            radius = size.width * 0.4f
                        )
                    )
                }
            }
        }

        Spacer(modifier = Modifier.height(10.dp))

        // Cybernetic matrix status bubble below core avatar
        Row(
            modifier = Modifier
                .background(Color(0xFF051121).copy(alpha = 0.5f * alpha), RoundedCornerShape(100.dp))
                .border(0.5.dp, CyanGlow.copy(alpha = 0.15f * alpha), RoundedCornerShape(100.dp))
                .padding(horizontal = 12.dp, vertical = 4.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.Center
        ) {
            // Bright status matrix dot
            Box(
                modifier = Modifier
                    .size(6.dp)
                    .background(CyanGlow.copy(alpha = alpha), CircleShape)
            )
            Spacer(modifier = Modifier.width(6.dp))
            Text(
                text = "ARCHI EN VEILLE",
                style = TimestampStyle.copy(
                    color = CyanGlow.copy(alpha = alpha),
                    fontSize = 9.sp,
                    fontWeight = FontWeight.Bold,
                    letterSpacing = 1.8.sp
                )
            )
        }
    }
}

@Composable
fun UserChatBubble(message: Message) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp, vertical = 6.dp),
        contentAlignment = Alignment.CenterEnd
    ) {
        Column(horizontalAlignment = Alignment.End) {
            // Dark glassmorphic user message bubble with high-radius corners
            Box(
                modifier = Modifier
                    .widthIn(max = 280.dp)
                    .background(
                        color = Color(0x660A192F),
                        shape = RoundedCornerShape(topStart = 24.dp, bottomStart = 24.dp, bottomEnd = 24.dp, topEnd = 6.dp)
                    )
                    .border(
                        width = 0.5.dp,
                        color = CyanGlow.copy(alpha = 0.2f),
                        shape = RoundedCornerShape(topStart = 24.dp, bottomStart = 24.dp, bottomEnd = 24.dp, topEnd = 6.dp)
                    )
                    .padding(horizontal = 20.dp, vertical = 12.dp)
            ) {
                Text(
                    text = message.text,
                    style = UserMessageStyle
                )
            }
            
            // Outward timestamp aligned precisely
            Row(
                modifier = Modifier.padding(top = 4.dp, end = 4.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = message.timestamp,
                    style = TimestampStyle
                )
                Spacer(modifier = Modifier.width(4.dp))
                Icon(
                    imageVector = Icons.Default.Check,
                    contentDescription = "Delivered",
                    tint = CyanGlow.copy(alpha = 0.9f),
                    modifier = Modifier.size(13.dp)
                )
            }
        }
    }
}

@Composable
fun ArchiChatBubble(message: Message) {
    // Left-aligned chat message carrying Archi's large floating hologram avatar (60-64px) overlaying top-left
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp, vertical = 12.dp),
        contentAlignment = Alignment.CenterStart
    ) {
        Box(
            modifier = Modifier
                .padding(start = 28.dp, top = 12.dp)
                .widthIn(max = 300.dp)
                .background(
                    color = Color(0x66051121),
                    shape = RoundedCornerShape(topStart = 6.dp, bottomStart = 24.dp, bottomEnd = 24.dp, topEnd = 24.dp)
                )
                .border(
                    width = 0.5.dp,
                    color = CyanGlow.copy(alpha = 0.2f),
                    shape = RoundedCornerShape(topStart = 6.dp, bottomStart = 24.dp, bottomEnd = 24.dp, topEnd = 24.dp)
                )
                .padding(start = 24.dp, end = 20.dp, top = 26.dp, bottom = 12.dp)
        ) {
            Column {
                Text(
                    text = message.text,
                    style = ArchiMessageStyle
                )
                Spacer(modifier = Modifier.height(6.dp))
                // Secondary aligned timestamp
                Text(
                    text = message.timestamp,
                    style = TimestampStyle,
                    modifier = Modifier.align(Alignment.End)
                )
            }
        }

        // Overlapping 60px Avatar placed strategically to overlap top-left
        Box(
            modifier = Modifier
                .align(Alignment.TopStart)
                .offset(y = (-4).dp)
                .size(60.dp)
                .background(Color(0xFF0A0F18), CircleShape)
                .border(1.dp, CyanGlow, CircleShape),
            contentAlignment = Alignment.Center
        ) {
            Image(
                painter = painterResource(id = android.R.drawable.stat_sys_phone_call), // Replace with real asset
                contentDescription = "Archi Avatar",
                modifier = Modifier
                    .fillMaxSize()
                    .clip(CircleShape),
                contentScale = ContentScale.Crop
            )
            // Cyber aura outer glowing path border
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .border(0.5.dp, Color.White.copy(alpha = 0.3f), CircleShape)
            )
        }

        // "● ARCHI" label placed above the bubble next to Archi's head
        Row(
            modifier = Modifier
                .offset(x = 94.dp, y = (-20).dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Box(
                modifier = Modifier
                    .size(5.dp)
                    .background(CyanGlow, CircleShape)
            )
            Spacer(modifier = Modifier.width(4.dp))
            Text(
                text = "ARCHI",
                style = AuthorLabelStyle
            )
        }
    }
}

@Composable
fun InputArea(
    textValue: TextFieldValue,
    onValueChange: (TextFieldValue) -> Unit,
    onSend: () -> Unit
) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp, bottom = 12.dp),
        contentAlignment = Alignment.Center
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .background(Color(0xE607121D), RoundedCornerShape(200.dp))
                .border(1.dp, CyanGlow.copy(alpha = 0.25f), RoundedCornerShape(200.dp))
                .padding(horizontal = 6.dp, vertical = 6.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            // Attachment clip action
            IconButton(onClick = {}) {
                Icon(
                    imageVector = Icons.Default.Share, // Represents Paperclip
                    contentDescription = "Attach",
                    tint = Color.White.copy(alpha = 0.4f),
                    modifier = Modifier.size(18.dp)
                )
            }

            // Real editable glassmorphic input
            BasicTextField(
                value = textValue,
                onValueChange = onValueChange,
                textStyle = TextStyle(color = Color.White, fontSize = 15.sp),
                modifier = Modifier
                    .weight(1f)
                    .padding(horizontal = 8.dp),
                decorationBox = { innerTextField ->
                    if (textValue.text.isEmpty()) {
                        Text(
                            text = "Écrire à Archi...",
                            style = TextStyle(color = Color.White.copy(alpha = 0.3f), fontSize = 15.sp)
                        )
                    }
                    innerTextField()
                }
            )

            // Vocal Micro Action
            IconButton(onClick = {}) {
                Icon(
                    imageVector = Icons.Default.KeyboardArrowUp, // Represents Mic
                    contentDescription = "Voice",
                    tint = Color.White.copy(alpha = 0.4f),
                    modifier = Modifier.size(18.dp)
                )
            }

            // Highly Glowing Blue Circular Send Button
            IconButton(
                onClick = onSend,
                modifier = Modifier
                    .size(40.dp)
                    .background(
                        Brush.verticalGradient(
                            colors = listOf(CyanGlow, BlueGlow)
                        ),
                        CircleShape
                    )
            ) {
                Icon(
                    imageVector = Icons.Default.ArrowUpward,
                    contentDescription = "Send",
                    tint = CosmicDark,
                    modifier = Modifier.size(18.dp)
                )
            }
        }
    }
}

@Composable
fun BottomNavigationBar() {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .height(64.dp)
            .background(Color(0xFF020409))
            .border(0.5.dp, Color.White.copy(alpha = 0.05f))
            .padding(horizontal = 8.dp),
        horizontalArrangement = Arrangement.SpaceAround,
        verticalAlignment = Alignment.CenterVertically
    ) {
        BottomNavItem("CHAT", Icons.Default.Send, active = true)
        BottomNavItem("VOCAL", Icons.Default.Call, active = false)
        BottomNavItem("AGENTS", Icons.Default.Person, active = false)
        BottomNavItem("DOCS", Icons.Default.List, active = false)
        BottomNavItem("RÉGLAGES", Icons.Default.Settings, active = false)
    }
}

@Composable
fun RowScope.BottomNavItem(label: String, icon: ImageVector, active: Boolean) {
    val tintColor = if (active) CyanGlow else Color.White.copy(alpha = 0.4f)
    val textAlpha = if (active) 1f else 0.4f

    Column(
        modifier = Modifier
            .weight(1f)
            .fillMaxHeight(),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Icon(
            imageVector = icon,
            contentDescription = label,
            tint = tintColor,
            modifier = Modifier.size(20.dp)
        )
        Spacer(modifier = Modifier.height(4.dp))
        Text(
            text = label,
            style = TabLabelStyle.copy(
                fontSize = 9.5.sp,
                color = tintColor.copy(alpha = textAlpha),
                fontWeight = if (active) FontWeight.Bold else FontWeight.Medium
            )
        )
    }
}
