import common from './common.ts';
import home from './home.ts';
import { capabilities, capabilitiesIndex } from './capabilities.ts';
import { engagementModels, engagementPage } from './engagement.ts';
import caseStudies from './caseStudies.ts';
import security from './security.ts';
import team from './team.ts';
import insights from './insights.ts';
import careers from './careers.ts';
import contact from './contact.ts';
import { privacy, terms, cookies } from './legal.ts';
import misc from './misc.ts';

const en = {
  common,
  home,
  capabilities,
  capabilitiesIndex,
  engagementModels,
  engagementPage,
  caseStudies,
  security,
  team,
  insights,
  careers,
  contact,
  legal: { privacy, terms, cookies },
  misc,
};

export default en;
