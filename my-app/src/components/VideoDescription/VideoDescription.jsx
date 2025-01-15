import styles from './VideoDescription.module.scss';

export const VideoDescription = () => {
    return (
        <div className={styles.description}>
            <div className={styles.titleContainer}>
                <h2 className={styles.descriptionTitle}>Description</h2>
            </div>
            
            <p className={styles.descriptionText}>Esse curso tem como objetivo de te dar os fundamentos da programação e entender um pouco mais sobre o web, precisamos desse conhecimento para então nos tornarmos aptos a estudar as diversas linguagens e tecnologias que vamos encontrar como desenvolvedores e desenvolvedoras web. Muito bem vamos diretos entender os fundamentos.</p>
            
        </div>
    )
}