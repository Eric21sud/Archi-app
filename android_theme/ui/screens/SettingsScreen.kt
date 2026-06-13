package com.example.archibald.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.Icon
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.archibald.ui.theme.*
import com.example.archibald.ui.components.*

/**
 * Archibald Design System - Composable Settings Screen
 * Maintains user-specific keys, parameters, and localized custom settings.
 */

@Composable
fun SettingsScreen(
    currentTab: ArchibaldTab,
    onTabSelected: (ArchibaldTab) -> Unit,
    modifier: Modifier = Modifier
) {
    Scaffold(
        topBar = {
            ArchibaldTopBar(
                onMenuClick = { /* No drawer needed */ },
                title = "PARAMÈTRES"
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
        val scrollState = rememberScrollState()

        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
                .padding(horizontal = Dimensions.SpaceLarge)
                .verticalScroll(scrollState)
        ) {
            Spacer(modifier = Modifier.height(Dimensions.SpaceMedium))

            // User Identity Banner
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(Color(0xFF071321).copy(alpha = 0.5f), CreativeShapes.ProjectCardShape)
                    .border(
                        width = Dimensions.BorderMicro,
                        color = Color.White.copy(alpha = 0.08f),
                        shape = CreativeShapes.ProjectCardShape
                    )
                    .padding(Dimensions.SpaceMedium)
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Box(
                        modifier = Modifier
                            .size(48.dp)
                            .background(CyanGlow.copy(alpha = 0.1f), CircleShape)
                            .border(Dimensions.BorderMicro, CyanGlow, CircleShape),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(
                            text = "E",
                            fontFamily = FontFamily.SansSerif,
                            fontWeight = FontWeight.Bold,
                            fontSize = 18.sp,
                            color = CyanGlow
                        )
                    }

                    Spacer(modifier = Modifier.width(Dimensions.SpaceMedium))

                    Column {
                        Text(
                            text = "Monsieur Éric",
                            style = ProjectTitleStyle.copy(fontSize = 14.sp)
                        )
                        Text(
                            text = "Utilisateur d'excellence d'Archibald",
                            style = ProjectActivityStyle.copy(fontSize = 10.sp)
                        )
                    }
                }
            }

            Spacer(modifier = Modifier.height(Dimensions.SpaceLarge))

            // Group: Archibald Mind Settings
            Text(
                text = "NOYAU COGNITIF",
                fontFamily = FontFamily.Monospace,
                fontWeight = FontWeight.Bold,
                fontSize = 10.sp,
                letterSpacing = 2.sp,
                color = Color.White.copy(alpha = 0.4f),
                modifier = Modifier.padding(bottom = Dimensions.SpaceSmall)
            )

            SettingsItem(
                icon = Icons.Default.Cpu, // proxy
                title = "Modèle Principal",
                subtitle = "Gemini 1.5 Pro (Haute Précision)",
                onClick = {}
            )

            SettingsItem(
                icon = Icons.Default.Memory,
                title = "Mémoire Locale",
                subtitle = "Sauvegarder les conversations sur l'appareil",
                onClick = {}
            )

            SettingsItem(
                icon = Icons.Default.VpnKey,
                title = "Clé API Personnelle",
                subtitle = "Actuellement configurée au niveau du serveur",
                onClick = {}
            )

            Spacer(modifier = Modifier.height(Dimensions.SpaceDoubleLarge))

            // Group: Appearance and Voice settings
            Text(
                text = "PERSONNALISATION",
                fontFamily = FontFamily.Monospace,
                fontWeight = FontWeight.Bold,
                fontSize = 10.sp,
                letterSpacing = 2.sp,
                color = Color.White.copy(alpha = 0.4f),
                modifier = Modifier.padding(bottom = Dimensions.SpaceSmall)
            )

            SettingsItem(
                icon = Icons.Default.VolumeUp,
                title = "Synthèse Vocale",
                subtitle = "Voix Premium Française (Miro)",
                onClick = {}
            )

            SettingsItem(
                icon = Icons.Default.Palette,
                title = "Thème Holographique",
                subtitle = "Bleu Nuit & Cyan Luminescent",
                onClick = {}
            )
        }
    }
}

@Composable
private fun SettingsItem(
    icon: ImageVector,
    title: String,
    subtitle: String,
    onClick: () -> Unit
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = Dimensions.SpaceSmall)
            .background(Color.White.copy(alpha = 0.02f), CreativeShapes.ProjectCardShape)
            .border(
                width = Dimensions.BorderMicro,
                color = Color.White.copy(alpha = 0.05f),
                shape = CreativeShapes.ProjectCardShape
            )
            .clickable { onClick() }
            .padding(v = Dimensions.SpaceMedium, h = Dimensions.SpaceMedium),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        Row(
            verticalAlignment = Alignment.CenterVertically,
            modifier = Modifier.weight(1f)
        ) {
            Box(
                modifier = Modifier
                    .size(34.dp)
                    .background(Color.White.copy(alpha = 0.05f), CircleShape)
                    .border(Dimensions.BorderMicro, Color.White.copy(alpha = 0.1f), CircleShape),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = icon,
                    contentDescription = title,
                    tint = CyanGlow,
                    modifier = Modifier.size(16.dp)
                )
            }

            Spacer(modifier = Modifier.width(Dimensions.SpaceMedium))

            Column {
                Text(
                    text = title,
                    style = ProjectTitleStyle.copy(fontSize = 12.sp)
                )
                Text(
                    text = subtitle,
                    style = ProjectActivityStyle.copy(fontSize = 10.sp)
                )
            }
        }

        Icon(
            imageVector = Icons.Default.ChevronRight,
            contentDescription = "Détails",
            tint = Color.White.copy(alpha = 0.25f),
            modifier = Modifier.size(16.dp)
        )
    }
}
