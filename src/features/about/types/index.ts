export type AboutSection =
  | 'personal-info'
  | 'professional-info'
  | 'publications'
  | 'hobbies';

export type AboutTab =
  | 'bio'
  | 'interests'
  | 'high-school'
  | 'university'
  | 'capacitacoes'
  | 'xp-uea'
  | 'xp-inova'
  | 'xp-ludus'
  | 'xp-inpa'
  | 'xp-fapeam'
  | 'xp-aranoua'
  | 'xp-semed'
  | 'xp-melo'
  | 'pub-ieee'
  | 'pub-sbie'
  | 'hobbies';

export interface SidebarFile {
  key: string;
  label: string;
  iconColor: string;
}

export interface SidebarFolder {
  key: string;
  label: string;
  iconColor: string;
  files?: SidebarFile[];
  subFolders?: SidebarFolder[];
}
