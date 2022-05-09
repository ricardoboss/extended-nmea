export enum PositionFixQualityIndicator {
  NoFix = 0,
  AutonomousFix = 1,
  DifferentialFix = 2,
  FixedRTK = 4,
  FloatRTK = 5,
  DeadReckoning = 6,

  // these are unconfirmed:
  PPS = 3,
  Manual = 7,
  Simulation = 8
}
