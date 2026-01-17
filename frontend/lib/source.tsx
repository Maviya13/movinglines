import { docs } from 'fumadocs-mdx:collections/server';
import { loader } from 'fumadocs-core/source';
import { BookOpen, Rocket, FileText, Settings, Code, Zap } from 'lucide-react';

const icons = {
    BookOpen: <BookOpen />,
    Rocket: <Rocket />,
    FileText: <FileText />,
    Settings: <Settings />,
    Code: <Code />,
    Zap: <Zap />,
};

export const source = loader({
    baseUrl: '/docs',
    source: docs.toFumadocsSource(),
    icon(icon) {
        if (icon && icon in icons) {
            return icons[icon as keyof typeof icons];
        }
        return undefined;
    },
});
