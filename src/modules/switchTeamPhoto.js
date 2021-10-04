const switchTeamPhoto = () => {
  const
    command = document.getElementById('command'),
    toggleDataImg = ({ target }) => (!target.matches('.command__photo') ? null :
      [target.dataset.img, target.src] = [target.src, target.dataset.img]);

  command.addEventListener('mouseover', toggleDataImg);
  command.addEventListener('mouseout', toggleDataImg);
};

export default switchTeamPhoto;
