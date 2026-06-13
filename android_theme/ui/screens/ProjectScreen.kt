package com.example.archibald.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.archibald.ui.theme.*
import com.example.archibald.ui.components.*

/**
 * Archibald Design System - Composable Project Screen
 * Consolidates overall business tracking and interactive project follow-ups.
 */

@Composable
fun ProjectScreen(
    currentTab: ArchibaldTab,
    onTabSelected: (ArchibaldTab) -> Unit,
    modifier: Modifier = Modifier
) {
    val projectList = listOf(
        DrawerProject("hector", "Hector Domotique Smart-Home", "hector", "Il y a 2h"),
        DrawerProject("archibald", "Majordome Virtuel Archibald", "archibald", "Actif"),
        DrawerProject("lecture", "Application Lecture Mobile", "lecture", "Hier"),
        DrawerProject("ve", "Comparateur Véhicules Électriques", "ve", "3 fév.")
    )

    Scaffold(
        topBar = {
            ArchibaldTopBar(
                onMenuClick = { /* Drawer not necessary here */ },
                title = "PROJETS SUIVIS"
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
                .padding(paddingValues)
                .padding(horizontal = Dimensions.SpaceLarge)
        ) {
            Spacer(modifier = Modifier.height(Dimensions.SpaceMedium))

            // Sub-status banner representing complete systems
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(CyanGlow.copy(alpha = 0.05f), CreativeShapes.ProjectCardShape)
                    .border(
                        width = Dimensions.BorderMicro,
                        color = CyanGlow.copy(alpha = 0.2f),
                        shape = CreativeShapes.ProjectCardShape
                    )
                    .padding(Dimensions.SpaceMedium)
            ) {
                Column {
                    Text(
                        text = "SYNTHÈSE DU NOYAU",
                        fontFamily = FontFamily.Monospace,
                        fontWeight = FontWeight.Bold,
                        fontSize = 11.sp,
                        letterSpacing = 1.5.sp,
                        color = CyanGlow
                    )
                    Spacer(modifier = Modifier.height(6.dp))
                    Text(
                        text = "Monsieur Éric, 4 espaces de développement sont actuellement synchronisés. Archibald supervise activement la domotique ainsi que les modules analytiques.",
                        fontFamily = FontFamily.SansSerif,
                        fontWeight = FontWeight.Normal,
                        fontSize = 12.sp,
                        color = Color.White.copy(alpha = 0.75f),
                        lineHeight = 18.sp
                    )
                }
            }

            Spacer(modifier = Modifier.height(Dimensions.SpaceLarge))

            // Section Header
            Text(
                text = "ESPACES DE TRAVAIL ACTIFS",
                fontFamily = FontFamily.Monospace,
                fontWeight = FontWeight.Bold,
                fontSize = 10.sp,
                letterSpacing = 2.sp,
                color = Color.White.copy(alpha = 0.4f),
                modifier = Modifier.padding(bottom = Dimensions.SpaceSmall)
            )

            // Scrollable active project workspaces list
            LazyColumn(
                modifier = Modifier.weight(1f),
                verticalArrangement = Arrangement.spacedBy(Dimensions.SpaceMedium)
            ) {
                items(projectList) { project ->
                    ArchibaldProjectCard(
                        name = project.name,
                        activity = project.activity,
                        iconType = project.iconType,
                        onClick = { /* Navigate or open space */ }
                    )
                }
            }
        }
    }
}
