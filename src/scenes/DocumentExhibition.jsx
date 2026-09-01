import React from 'react';
import { motion } from 'framer-motion';
import HeroIdentity from '../components/HeroIdentity';
import DecisionEngine from '../components/DecisionEngine';
import ProjectExhibition from '../components/ProjectExhibition';
import FieldOperations from '../components/FieldOperations';
import IdentityCompiler from '../components/IdentityCompiler';
import TransmissionHub from '../components/TransmissionHub';

// Premium Easing Curve
const ease = [0.22, 1, 0.36, 1];

export default function DocumentExhibition({ onSelectProject }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: "spring", mass: 1.2, stiffness: 60, damping: 15 }}
      className="w-full min-h-screen bg-[#030303] text-[#F3F3F3] overflow-x-hidden selection:bg-[#FF3300] selection:text-white"
    >
      {/* =========================================
          ACT 01: THE IDENTITY MATRIX (HERO)
          ========================================= */}
      <div className="relative z-10">
        <HeroIdentity />
      </div>

      {/* =========================================
          ACT 02: THE DECISION ENGINE (Architecture)
          ========================================= */}
      <DecisionEngine />

      {/* =========================================
          ACT 03: DUAL-CORE CAPABILITY (Projects)
          ========================================= */}
      <ProjectExhibition />

      {/* =========================================
          ACT 04: OPERATIONAL TIMELINE
          ========================================= */}
      <FieldOperations />

      {/* =========================================
          ACT 05: THE IDENTITY COMPILER
          ========================================= */}
      <IdentityCompiler />

      {/* =========================================
          ACT 06: TRANSMISSION & DIRECT LINES
          ========================================= */}
      <TransmissionHub />
    </motion.div>
  );
}
